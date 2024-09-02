import React, { useEffect, useState } from 'react';
import { getCards } from '../api/cards';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SharePage = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [detailedSelection, setDetailedSelection] = useState({});
  const [shareMethod, setShareMethod] = useState('byCard');

  useEffect(() => {
    const fetchCards = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const fetchedCards = await getCards(user.token);
          setCards(fetchedCards);
          // Initialize detailed selection state
          const initialDetailedSelection = fetchedCards.reduce((acc, card) => {
            acc[card._id] = {
              name: false,
              phoneNumber: false,
              email: false,
              companyName: false,
              contactNo: false,
              gstNo: false,
              address: false,
            };
            return acc;
          }, {});
          setDetailedSelection(initialDetailedSelection);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      }
    };

    fetchCards();
  }, []);

  const handleCheckboxChange = (cardId) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const handleDetailedCheckboxChange = (cardId, field) => {
    setDetailedSelection((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [field]: !prev[cardId][field],
      },
    }));
  };

  const handleShare = async () => {
    try {
      if (shareMethod === 'byCard') {
        // Share by Card
        const shareContent = cards
          .filter((card) => selectedCards.includes(card._id))
          .map((card) => {
            return `
              ${card.type === 'person' ? `Name: ${card.name}\nPhone: ${card.phoneNumber}\nEmail: ${card.email}` : `Company: ${card.companyName}\nContact No: ${card.contactNo}\nGST NO: ${card.gstNo}`}
              Address: ${card.address}
            `;
          })
          .join('\n\n---\n\n'); // Join multiple card details with a separator

        if (navigator.canShare && navigator.canShare({ text: shareContent })) {
          await navigator.share({
            title: 'Shared Cards',
            text: shareContent,
          });
          alert('Cards shared successfully!');
        } else {
          alert('Sharing not supported or no content to share');
        }
      } else {
        // Share by Detailed Data
        const shareContent = cards
          .map((card) => {
            const selectedDetails = Object.entries(detailedSelection[card._id])
              .filter(([key, value]) => value)
              .map(([key]) => {
                if (card.type === 'person' && key === 'name') return `Name: ${card.name}`;
                if (card.type === 'person' && key === 'phoneNumber') return `Phone: ${card.phoneNumber}`;
                if (card.type === 'person' && key === 'email') return `Email: ${card.email}`;
                if (card.type === 'organization' && key === 'companyName') return `Company: ${card.companyName}`;
                if (card.type === 'organization' && key === 'contactNo') return `Contact No: ${card.contactNo}`;
                if (card.type === 'organization' && key === 'gstNo') return `GST NO: ${card.gstNo}`;
                if (key === 'address') return `Address: ${card.address}`;
                return '';
              })
              .filter(detail => detail !== '')
              .join('\n');

            return selectedDetails; // Exclude card ID
          })
          .filter(content => content !== '')
          .join('\n\n---\n\n');

        if (navigator.canShare && navigator.canShare({ text: shareContent })) {
          await navigator.share({
            title: 'Shared Card Details',
            text: shareContent,
          });
          alert('Detailed information shared successfully!');
        } else {
          alert('Sharing not supported or no content to share');
        }
      }
    } catch (error) {
      alert('Error sharing cards');
    }
  };

  return (
    <div>
      <h1>Share Cards</h1>
      <div>
        <button onClick={() => setShareMethod('byCard')}>Share by Card</button>
        <button onClick={() => setShareMethod('byDetail')}>Share by Detailed Data</button>
      </div>
      {shareMethod === 'byCard' ? (
        <form>
          {cards.map((card) => (
            <div key={card._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCards.includes(card._id)}
                  onChange={() => handleCheckboxChange(card._id)}
                />
                {card.type === 'person' ? card.name : card.companyName}
              </label>
            </div>
          ))}
          <button type="button" onClick={handleShare}>Share Selected Cards</button>
        </form>
      ) : (
        <form>
          {cards.map((card) => (
            <div key={card._id}>
              <h2>{card.type === 'person' ? card.name : card.companyName}</h2>
              <div>
                {card.type === 'person' && (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].name}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'name')}
                      />
                      Name
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].phoneNumber}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'phoneNumber')}
                      />
                      Phone Number
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].email}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'email')}
                      />
                      Email
                    </label>
                  </>
                )}
                {card.type === 'organization' && (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].companyName}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'companyName')}
                      />
                      Company Name
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].contactNo}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'contactNo')}
                      />
                      Contact No
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={detailedSelection[card._id].gstNo}
                        onChange={() => handleDetailedCheckboxChange(card._id, 'gstNo')}
                      />
                      GST NO
                    </label>
                  </>
                )}
                <label>
                  <input
                    type="checkbox"
                    checked={detailedSelection[card._id].address}
                    onChange={() => handleDetailedCheckboxChange(card._id, 'address')}
                  />
                  Address
                </label>
              </div>
            </div>
          ))}
            <Link to="/dashboard"><button type="button"> Back </button></Link>
          <button type="button" onClick={handleShare}>Share Selected Details</button>
        </form>
      )}
    </div>
  );
};

export default SharePage;
