function Champion({champion: {name, key, legacy, position, rangetype, region, resource, title}}) {
  return (
    <p>{name}, {title}</p>
  );
}

export default Champion;
