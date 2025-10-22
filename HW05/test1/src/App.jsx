import './App.css'

const MyColors = [
  { value: 7, color: '#000000' },
  { value: 8, color: '#0055A4' },
  { value: 9, color: '#C41E3A' },
  { value: 4, color: '#D4AF37' },
  { value: 5, color: '#000000' },
  { value: 6, color: '#0055A4' },
  { value: 1, color: '#C41E3A' },
  { value: 2, color: '#D4AF37' },
  { value: 3, color: '#000000' }
];

function Block(props) {
  const { bgcolor, children } = props;

  const handleClick = () => {
    alert(children);
  };

  return (
    <div 
      className="block"
      style={{ backgroundColor: bgcolor }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

function ColorGrid(props) {
  const { colorArray } = props;

  return (
    <div className="color-grid">
      {colorArray.map((item) => (
        <Block 
          key={item.value}
          bgcolor={item.color}
        >
          {item.value}
        </Block>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <ColorGrid colorArray={MyColors} />
    </>
  )
}

export default App