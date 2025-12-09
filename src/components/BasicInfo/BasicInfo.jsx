import { RACES, CLASSES, GENDERS } from '../../utils/constants';


const BasicInfo = ({ character, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Basic Information</h2>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Character Name</label>
        <input
          type="text"
          name="name"
          value={character.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter character name"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Race</label>
        <select
          name="race"
          value={character.race}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {RACES.map(race => (
            <option key={race} value={race}>{race}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Class</label>
        <select
          name="class"
          value={character.class}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {CLASSES.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          value={character.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {GENDERS.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Level</label>
        <input
          type="number"
          name="level"
          value={character.level}
          onChange={handleChange}
          min="1"
          max="30"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default BasicInfo;
