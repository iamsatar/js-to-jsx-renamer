// This file contains mixed content
// <Offcanvas/> // JSX in comment

export const htmlString = "<p>This is HTML in a string</p>";

export const Component = () => {
  return (
    <div className="container">
      <p>This is actual JSX code</p>
      <Component>Nested component</Component>
    </div>
  );
};

export default Component; 