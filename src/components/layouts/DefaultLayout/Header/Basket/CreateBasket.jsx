const CreateBasket = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input
        placeholer=""
        value={value}
        onChange={(e) => updateText(e.target.value)}
      />
      <button onClick={handleAction}>Add todo</button>
    </label>
  );
};

export default CreateBasket;
