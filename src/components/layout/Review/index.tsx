'use client';

import { useEffect, useState } from 'react';
import { addReview, getReviewByUserId } from '@/actions/actions';

export default function Review() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const handleClick = (n: number) => {
    setRating(n);
  };

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment');
      return;
    }

    const result = await addReview({ star_rating: rating, comment, userId });
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const getStarClass = (index: number) => {
    if (index < rating) {
      switch (index + 1) {
        case 1:
          return 'text-red-500';
        case 2:
          return 'text-orange-500';
        case 3:
          return 'text-yellow-300';
        case 4:
          return 'text-yellow-500';
        case 5:
          return 'text-green-600';
        default:
          return 'text-gray-300';
      }
    }
    return 'text-gray-300';
  };

  useEffect(() => {
    const updateUser = async () => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const userSession = JSON.parse(storedUser);
        setUserId(userSession.id ?? '');

        if (userSession.id) {
          const reviewResult = await getReviewByUserId(userSession.id);
          if (reviewResult.success && reviewResult.data) {
            setRating(reviewResult.data.star_rating);
            setComment(reviewResult.data.comment);
          }
        }
      }
    };

    updateUser();

    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  return (
    <div className="max-w-lg bg-white p-4 shadow-lg rounded-lg text-center border border-gray-300">
      <h1 className="text-xl font-bold mb-4">Review</h1>
      <div className="flex justify-center space-x-1 mb-4">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} onClick={() => handleClick(index + 1)} className={`text-8xl cursor-pointer ${getStarClass(index)}`}>
            ★
          </span>
        ))}
      </div>
      <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <h3 className="text-lg">Rating is: {rating}/5</h3>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
        Submit Review
      </button>
    </div>
  );
}
