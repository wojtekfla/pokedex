export function PokeCardInfoWrapper({ children, attribute }) {

  return (
    <>
      <div>
        <p>{attribute}</p>
        <p>{children}</p>
      </div>
    </>
  );
}
