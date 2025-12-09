import { useState } from 'react';
import { RACES, CLASSES, GENDERS, CLASS_EQUIPMENT,
         CLASS_ABILITIES, RACE_ABILITIES, hairColors } from '../../utils/constants';
import { calculateAttributes, createNewCharacter } from '../../services/characterService';
import  { generateCharacter }  from '../../services/generatorService.js';

const CharacterGenerator = ({ onCharacterGenerated,character }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateCharacter = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your character');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const message = `
        I want you to create a character for an RPG game based on this description: "${prompt}".

        Current character details:
        ${JSON.stringify(character)}

        Use ONLY the following options to create the character:
        - Races: ${RACES.join(', ')}
        - Classes: ${CLASSES.join(', ')}
        - Genders: ${GENDERS.join(', ')}

        Generate a name appropriate for the character.

        Also include:
        - Hair color from: ${Object.keys(hairColors).join(', ')}
        - Eye color (hex color code)
        - Skin tone (hex color code)
        - Height in cm (realistic for race)

        Return the result as a valid JSON object with this structure:
        {
          "name": string,
          "race": string (one of the available races),
          "class": string (one of the available classes),
          "gender": string (one of the available genders),
          "appearance": {
            "hairColor": string (color prefix, like "b_" for Black),
            "eyeColor": string (hex code),
            "skinTone": string (hex code),
            "height": number (cm)
          },
          "equipment": {
            "top": string (key of the selected top item, not the display name),
            "pant": string (key of the selected pants, not the display name),
            "foot": string (key of the selected footwear, not the display name),
            "hair": string (key of the selected hair, not the display name),
            "hat": string (key of the selected hat or empty string, not the display name),
            "accessory": string (key of the selected accessory or empty string, not the display name),
            "bag": string (key of the selected bag or empty string, not the display name)
          },
          "selectedAbilities": string[] (select 2-3 abilities appropriate for the class and race)
        }

        IMPORTANT: For equipment, you must use the KEYS not the display names. For example, use "b_tee" not "Black T-Shirt".
        Use the appropriate key for each item from this mapping:

        Tops: ${Object.entries(CLASS_EQUIPMENT.tops).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Pants: ${Object.entries(CLASS_EQUIPMENT.pants).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Footwear: ${Object.entries(CLASS_EQUIPMENT.foots).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Hair: ${Object.entries(CLASS_EQUIPMENT.hairs).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Hats: ${Object.entries(CLASS_EQUIPMENT.hats).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Accessories: ${Object.entries(CLASS_EQUIPMENT.accessories).map(([key, value]) => `${key}: "${value}"`).join(', ')}
        Bags: ${Object.entries(CLASS_EQUIPMENT.bags).map(([key, value]) => `${key}: "${value}"`).join(', ')}

        Hair colors should be one of: ${Object.entries(hairColors).map(([color, prefix]) => `${color} (${prefix})`).join(', ')}

        The response should be ONLY the JSON object with no additional text or explanation.
      `;



      const characterData = await generateCharacter(message);

      const baseCharacter = createNewCharacter();

      const equipmentKeysMap = {};
      Object.keys(CLASS_EQUIPMENT).forEach(category => {
        const categoryMap = {};
        Object.entries(CLASS_EQUIPMENT[category]).forEach(([key, value]) => {
          categoryMap[value.toLowerCase()] = key;
        });
        equipmentKeysMap[category] = categoryMap;
      });

      const processedEquipment = { ...characterData.equipment };

      const generatedCharacter = {
        ...baseCharacter,
        id: Date.now().toString(),
        name: characterData.name,
        race: characterData.race,
        class: characterData.class,
        gender: characterData.gender,
        appearance: {
          ...baseCharacter.appearance,
          ...characterData.appearance
        },
        equipment: {
          ...baseCharacter.equipment,
          ...processedEquipment
        },
        attributes: calculateAttributes(characterData.class, characterData.race),
        selectedAbilities: characterData.selectedAbilities || []
      };

      onCharacterGenerated(generatedCharacter);

      setPrompt('');

    } catch (error) {
      console.error('Error generating character:', error);
      setError('Failed to generate character. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate Character from Description</h2>
      <div className="mb-4">
        <label htmlFor="character-prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Describe your character
        </label>
        <textarea
          id="character-prompt"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Example: A battle-hardened dwarf warrior who lost an eye in combat but gained wisdom..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
        onClick={handleGenerateCharacter}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Character'}
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p>Try descriptions like:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>"A nimble elf rogue who grew up in the forest and has a mischievous streak"</li>
          <li>"A righteous human cleric devoted to healing and protection"</li>
          <li>"A battle-scarred orc warrior with a soft spot for small animals"</li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterGenerator;
