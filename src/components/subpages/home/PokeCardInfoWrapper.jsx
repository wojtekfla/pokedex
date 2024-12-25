export function PokeCardInfoWrapper({ children, attribute }) {

  return (
    <>
      <div className="flex flex-col">
        <p className="">{attribute}</p>
        <p className="">{children}</p>
      </div>
    </>
  );
}
