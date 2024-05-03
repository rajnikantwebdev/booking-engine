function ShimmerEffect() {
  return (
    <div className="w-full animate-pulse grid md:grid-cols-3 gap-4">
      {[...Array(15)].map((_, i) => {
        return (
          <div
            key={i}
            className="h-[17rem] my-4 bg-gray-500 rounded-xl max-w-96"
          ></div>
        );
      })}
    </div>
  );
}

export default ShimmerEffect;
