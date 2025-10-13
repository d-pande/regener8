
import { useState } from 'react';

function ProgressBar({ progress }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      background: '#f4f4f4',
      zIndex: 100,
      padding: 0,
      marginBottom: 24
    }}>
      <div style={{
        width: 600,
        minWidth: 300,
        maxWidth: '100vw',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '12px 24px 8px 24px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <div style={{
          height: 8,
          width: '100%',
          background: '#e2e8f0',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#3182ce',
            transition: 'width 0.3s',
            minWidth: 0
          }} />
        </div>
        <div style={{ fontSize: 12, color: '#444', marginTop: 2, textAlign: 'right', paddingRight: 2 }}>{progress}% complete</div>
      </div>
    </div>
  );
}

export default function Survey() {
  const [form, setForm] = useState({
    respondent: '',
    dob: '',
    sex: '',
    race: '',
    jointPain: [],
    helpReading: '',
    vasRightKnee: '', // Start as empty
    vasLeftKnee: '',  // Start as empty
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
    // Calculate progress
    const requiredFields = [
      form.respondent,
      form.dob,
      form.sex,
      form.race,
      form.helpReading,
      form.jointPain.length > 0 ? 'yes' : '',
      form.vasRightKnee !== '' ? 'yes' : '',
      form.vasLeftKnee !== '' ? 'yes' : ''
    ];
    const totalRequired = requiredFields.length;
    const answered = requiredFields.filter(Boolean).length;
    const progress = totalRequired === 0 ? 0 : Math.round((answered / totalRequired) * 100);

    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
        setForm(prev => {
          const arr = prev[name] || [];
          if (checked) {
            return { ...prev, [name]: [...arr, value] };
          } else {
            return { ...prev, [name]: arr.filter(v => v !== value) };
          }
        });
      } else if (type === 'range') {
        setForm(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
      } else {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    }

    function handleSubmit(e) {
      e.preventDefault();
      setSubmitted(true);
    }
  return (
    <>
      <ProgressBar progress={progress} />
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h1>Medical Questionnaire</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Who is completing this survey? */}
            <label><strong>Who is completing this survey? *</strong></label>
            <div style={{ display: 'flex', gap: 20, marginBottom: 8 }}>
              <label><input type="radio" name="respondent" value="Patient/self" checked={form.respondent === 'Patient/self'} onChange={handleChange} required /> Patient/self</label>
              <label><input type="radio" name="respondent" value="Caregiver" checked={form.respondent === 'Caregiver'} onChange={handleChange} required /> Caregiver</label>
            </div>
            {/* Date of birth */}
            <label><strong>Date of birth: *</strong>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} required style={{ marginLeft: 10 }} />
            </label>
            {/* Sex */}
            <label><strong>Sex: *</strong></label>
            <div style={{ display: 'flex', gap: 20, marginBottom: 8 }}>
              <label><input type="radio" name="sex" value="Female" checked={form.sex === 'Female'} onChange={handleChange} required /> Female</label>
              <label><input type="radio" name="sex" value="Male" checked={form.sex === 'Male'} onChange={handleChange} required /> Male</label>
            </div>
            {/* Race */}
            <label><strong>Race: *</strong>
              <select name="race" value={form.race} onChange={handleChange} required style={{ marginLeft: 10 }}>
                <option value="" disabled>Select...</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Asian">Asian</option>
                <option value="Black or African American">Black or African American ("Haitian" or "Negro")</option>
                <option value="Hispanic or Latino">Hispanic or Latino ("Spanish origin")</option>
                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                <option value="White">White</option>
                <option value="Do not want to specify">Do not want to specify</option>
              </select>
            </label>
            {/* Joint pain checkboxes */}
            <label><strong>Do you experience pain in the following joints? *</strong></label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
              <label><input type="checkbox" name="jointPain" value="Left hip" checked={form.jointPain.includes('Left hip')} onChange={handleChange} /> Left hip</label>
              <label><input type="checkbox" name="jointPain" value="Right hip" checked={form.jointPain.includes('Right hip')} onChange={handleChange} /> Right hip</label>
              <label><input type="checkbox" name="jointPain" value="Left knee" checked={form.jointPain.includes('Left knee')} onChange={handleChange} /> Left knee</label>
              <label><input type="checkbox" name="jointPain" value="Right knee" checked={form.jointPain.includes('Right knee')} onChange={handleChange} /> Right knee</label>
              <label><input type="checkbox" name="jointPain" value="Left ankle" checked={form.jointPain.includes('Left ankle')} onChange={handleChange} /> Left ankle</label>
              <label><input type="checkbox" name="jointPain" value="Right ankle" checked={form.jointPain.includes('Right ankle')} onChange={handleChange} /> Right ankle</label>
            </div>
            {/* Help reading medical material */}
            <label><strong>How often do you need to have someone help you when you read instructions, pamphlets, or other written material from your doctor or pharmacy? *</strong></label>
            <div style={{ display: 'flex', gap: 20, marginBottom: 8 }}>
              <label><input type="radio" name="helpReading" value="Never" checked={form.helpReading === 'Never'} onChange={handleChange} required /> Never</label>
              <label><input type="radio" name="helpReading" value="Rarely" checked={form.helpReading === 'Rarely'} onChange={handleChange} required /> Rarely</label>
              <label><input type="radio" name="helpReading" value="Sometimes" checked={form.helpReading === 'Sometimes'} onChange={handleChange} required /> Sometimes</label>
              <label><input type="radio" name="helpReading" value="Often" checked={form.helpReading === 'Often'} onChange={handleChange} required /> Often</label>
              <label><input type="radio" name="helpReading" value="Always" checked={form.helpReading === 'Always'} onChange={handleChange} required /> Always</label>
            </div>
            {/* VAS - Right Knee */}
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <strong>VISUAL ANALOGUE SCALE (VAS) - RIGHT KNEE *</strong>
              <span style={{ fontSize: '0.95em', color: '#444', marginBottom: 4 }}>Please indicate the level of pain that you feel on average during the day at your RIGHT knee. 0 = No pain, 10 = Unbearable pain.</span>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                name="vasRightKnee"
                value={form.vasRightKnee === '' ? 0 : form.vasRightKnee}
                onChange={handleChange}
                required
                style={{ width: '100%', marginTop: 8 }}
              />
              <span style={{ marginTop: 4 }}>
                <strong>{form.vasRightKnee === '' ? <span style={{color:'#aaa'}}>Select</span> : form.vasRightKnee}</strong>
              </span>
            </label>
            {/* VAS - Left Knee */}
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <strong>VISUAL ANALOGUE SCALE (VAS) - LEFT KNEE *</strong>
              <span style={{ fontSize: '0.95em', color: '#444', marginBottom: 4 }}>Please indicate the level of pain that you feel on average during the day at your LEFT knee. 0 = No pain, 10 = Unbearable pain.</span>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                name="vasLeftKnee"
                value={form.vasLeftKnee === '' ? 0 : form.vasLeftKnee}
                onChange={handleChange}
                required
                style={{ width: '100%', marginTop: 8 }}
              />
              <span style={{ marginTop: 4 }}>
                <strong>{form.vasLeftKnee === '' ? <span style={{color:'#aaa'}}>Select</span> : form.vasLeftKnee}</strong>
              </span>
            </label>
            <label>
              Additional Notes:
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                style={{ marginLeft: 10, width: '100%' }}
                placeholder="Anything else you'd like to share?"
              />
            </label>
            <button type="submit" style={{ marginTop: 20, padding: '10px 0', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <h2>Thank you for submitting the survey!</h2>
            <p>Your responses have been recorded.</p>
          </div>
        )}
      </div>
    </>
  );
}