// This file contains actual JSX code
const Component = () => {
  return (
    <div className="container">
      <p>This is actual JSX code</p>
      <Component>Nested component</Component>
    </div>
  );
};

export default Component; 