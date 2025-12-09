import { CLASS_EQUIPMENT } from '../../utils/constants';

const Equipment = ({ equipment, onChange }) => {
  const availableEquipment = CLASS_EQUIPMENT;

  const handleEquipmentChange = (type, item) => {
    onChange({
      ...equipment,
      [type]: item
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const itemInput = e.target.elements.newItem;
    const newItem = itemInput.value.trim();

    if (newItem) {
      onChange({
        ...equipment,
        items: [...(equipment.items || []), newItem]
      });
      itemInput.value = '';
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...(equipment.items || [])];
    updatedItems.splice(index, 1);
    onChange({
      ...equipment,
      items: updatedItems
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Equipment</h2>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Top</label>
        <select
          value={equipment.top || ''}
          onChange={(e) => handleEquipmentChange('top', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Top</option>
          {Object.keys(availableEquipment.tops).map((top) => (
            <option key={top} value={top}>{availableEquipment.tops[top]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Pant</label>
        <select
          value={equipment.pant || ''}
          onChange={(e) => handleEquipmentChange('pant', e.target.value)}
          className="w-full p-2 border rounded"
        >

          {Object.keys(availableEquipment.pants).map((pant) => (
            <option key={pant} value={pant}>{availableEquipment.pants[pant]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Hats</label>
        <select
          value={equipment.hat || ''}
          onChange={(e) => handleEquipmentChange('hat', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Hat</option>
          {Object.keys(availableEquipment.hats).map((hat) => (
            <option key={hat} value={hat}>{availableEquipment.hats[hat]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Hair</label>
        <select
          value={equipment.hair || ''}
          onChange={(e) => handleEquipmentChange('hair', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Hair Style</option>
          {Object.keys(availableEquipment.hairs).map((hair) => (
            <option key={hair} value={hair}>{availableEquipment.hairs[hair]}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Backpacks</label>
        <select
          value={equipment.bag || ''}
          onChange={(e) => handleEquipmentChange('bag', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a bag</option>
          {Object.keys(availableEquipment.bags).map((bag) => (
            <option key={bag} value={bag}>{availableEquipment.bags[bag]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Footwear</label>
        <select
          value={equipment.foot || ''}
          onChange={(e) => handleEquipmentChange('foot', e.target.value)}
          className="w-full p-2 border rounded"
        >
          {Object.keys(availableEquipment.foots).map((foot) => (
            <option key={foot} value={foot}>{availableEquipment.foots[foot]}</option>
          ))}
        </select>
      </div>


      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Accessories</label>
        <select
          value={equipment.accessory || ''}
          onChange={(e) => handleEquipmentChange('accessory', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Accessory</option>
          {Object.keys(availableEquipment.accessories).map((accessory) => (
            <option key={accessory} value={accessory}>{availableEquipment.accessories[accessory]}</option>
          ))}
        </select>
      </div>



      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Inventory Items</label>
        <div className="bg-gray-50 p-2 rounded mb-2 max-h-32 overflow-y-auto">
          {equipment.items && equipment.items.length > 0 ? (
            <ul className="list-disc pl-5">
              {equipment.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-1">
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 text-xs hover:text-red-700"
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No items added yet</p>
          )}
        </div>

        <form onSubmit={handleAddItem} className="flex">
          <input
            type="text"
            name="newItem"
            placeholder="Add an item..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>

      <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
        <p className="font-medium">Equipment Bonuses:</p>
        <ul className="list-disc pl-5 mt-1">
          {equipment.pant && (
            <li>{equipment.pant}: +2 Attack</li>
          )}
          {equipment.top && (
            <li>{equipment.top}: +3 Defense</li>
          )}
          {equipment.foot && (
            <li>{equipment.foot}: +3 Defense</li>
          )}
          {equipment.hair && (
            <li>{equipment.hair}: +3 Defense</li>
          )}
          {equipment.hat && (
            <li>{equipment.hat}: +3 Defense</li>
          )}
          {equipment.accessory && (
            <li>{equipment.accessory}: +3 Defense</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Equipment;
