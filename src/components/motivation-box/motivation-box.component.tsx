import { useState } from "react";
import { getDailyMessage } from "../../api/habitApi";
import './motivation-box.component.scss';
const MotivationBox = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState<string>();
  const [loading, setIsLoading] = useState(false);

  const handleGetMessage = async () => {
    setIsLoading(true);
    const response = await getDailyMessage({ user_id: userId });
    const raw = response.data.plan?.raw || "";

    setMessage(raw);
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Need Motivation?</h2>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        required
      />
      <button onClick={handleGetMessage}>Get Message</button>
      {!loading && message && (
        <div  className="motivation-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default MotivationBox;
