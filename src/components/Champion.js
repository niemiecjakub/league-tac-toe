function Champion({ champion, champion: { name, title } }) {
  console.log(champion.key);
  return (
    <div className="flex flex-row">
      <img src={`/icons/${champion.key}.png`} />
      <p>
        {" "}
        {name}, {title}{" "}
      </p>
    </div>
  );
}

export default Champion;
