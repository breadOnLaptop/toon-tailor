import React, { useState } from 'react';
import BasicInfo from './components/BasicInfo/BasicInfo';
import Attributes from './components/Attributes/Attributes';
import Appearance from './components/Appearance/Appearance';
import Equipment from './components/Equipment/Equipment';
import Abilities from './components/Abilities/Abilities';
import CharacterPreview from './components/CharacterPreview/CharacterPreview';
import CharacterList from './components/CharacterList/CharacterList';
import CharacterGenerator from './components/CharacterGenerator/CharacterGenerator';
import { createNewCharacter, calculateAttributes } from './services/characterService';
import { saveCharacter } from './services/storageService';
import { RACE_BONUSES } from './utils/constants';
import './global.css';


function App() {
  const [character, setCharacter] = useState(createNewCharacter());
  const [showCharacterList, setShowCharacterList] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const setupCharacter = (char) => {
    setCharacter(char);
    setShowCharacterList(false);
    setShowGenerator(false);
    setUnsavedChanges(false);
  };

  const handleBasicInfoChange = (field, value) => {
    const newCharacter = { ...character, [field]: value };
    if (field === 'class' || field === 'race') {
      const newAttributes = calculateAttributes(
        field === 'class' ? value : character.class,
        field === 'race' ? value : character.race,
        character.attributes
      );
      newCharacter.attributes = newAttributes;
    }
    setCharacter(newCharacter);
    setUnsavedChanges(true);
  };

  const handleAttributesChange = (newAttributes) => {
    setCharacter({ ...character, attributes: newAttributes });
    setUnsavedChanges(true);
  };

  const handleAppearanceChange = (newAppearance) => {
    setCharacter({ ...character, appearance: newAppearance });
    setUnsavedChanges(true);
  };

  const handleEquipmentChange = (newEquipment) => {
    setCharacter({ ...character, equipment: newEquipment });
    setUnsavedChanges(true);
  };

  const handleAbilitiesChange = (newCharacter) => {
    setCharacter(newCharacter);
    setUnsavedChanges(true);
  };

  const handleSaveCharacter = () => {
    saveCharacter(character);
    setUnsavedChanges(false);
    alert('Character saved successfully!');
  };

  const handleGeneratedCharacter = (generatedCharacter) => {
    setCharacter(generatedCharacter);
    // setShowGenerator(false);
    setShowCharacterList(false);
    setUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Character Creator</h1>
          <div className="flex gap-2">
            {!showCharacterList && !showGenerator && (
              <>
                <button
                  onClick={() => {
                    setShowCharacterList(true);
                    setShowGenerator(false);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  My Characters
                </button>
                <button
                  onClick={() => {
                    setShowGenerator(true);
                    // setShowCharacterList(false);
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                  AI Generator
                </button>
                <button
                  onClick={handleSaveCharacter}
                  className={`${
                    unsavedChanges
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400'
                  } text-white px-4 py-2 rounded`}
                  disabled={!unsavedChanges}
                >
                  Save Character
                </button>
              </>
            )}

            {(showCharacterList || showGenerator) && (
              <button
                onClick={() => {
                  setupCharacter(createNewCharacter());
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create New Character
              </button>
            )}
          </div>
        </div>
      </header>

      {showCharacterList && (
        <div className="max-w-md mx-auto">
          <CharacterList
            onSelectCharacter={setupCharacter}
            onCreateNew={() => setupCharacter(createNewCharacter())}
          />
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setShowGenerator(true);
                setShowCharacterList(false);
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Use AI to Generate Character
            </button>
          </div>
        </div>
      )}

      {showGenerator && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="max-w-md mx-auto">
          <CharacterGenerator character={character} onCharacterGenerated={handleGeneratedCharacter} />
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setShowGenerator(false);
                // setShowCharacterList(true);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Edit Generated Character
            </button>
          </div>
        </div>
        <div className="col-span-1">
            <CharacterPreview character={character} />
          </div>
        </div>
      )}

      {!showCharacterList && !showGenerator && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BasicInfo character={character} onChange={handleBasicInfoChange} />
              <Equipment
                equipment={character.equipment}
                characterClass={character.class}
                onChange={handleEquipmentChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Appearance appearance={character.appearance} onChange={handleAppearanceChange} />
              <Attributes
                attributes={character.attributes}
                raceBonuses={RACE_BONUSES[character.race]}
                onChange={handleAttributesChange}
              />
            </div>
            <Abilities character={character} onChange={handleAbilitiesChange} />
          </div>
          <div className="col-span-1">
            <CharacterPreview character={character} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
