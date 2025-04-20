import { useState } from 'react';
import { generatePlan } from '../../api/habitApi'
import './habit-form.component.scss'
const HabitForm = ()=> {
  const [goal, setGoal] = useState('');
  const [preferences, setPreferences] = useState('');
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit =  async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPlan([]);

    try {
      const response = await generatePlan({
        user_id: userId,
        goal,
        preferences,
      });


      const raw = response.data.plan?.raw || '';

      const parsed = raw.split(/\n\s*\n/).filter((p: string) => p.trim() !== '');
      setPlan(parsed);
    } catch (error) {
      console.error('Error generating plan:', error);
      setPlan(['❌ Something went wrong. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>📝 Generate Your 7-Day Habit Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Your goal"
          required
        />
        <input
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Preferences"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {loading && <p>⏳ Creating your personalized plan...</p>}

      {!loading && plan.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3>📋 Your 7-Day Plan</h3>
          {plan.map((section, idx) => (
            <div
              key={idx}
              className='plan'
              dangerouslySetInnerHTML={{ __html: section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default HabitForm;