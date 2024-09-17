export function OrderInput() {
    const token2Symbol = 'token2Symbol';
  return (
    <div className="p-2 !pt-0 text-sx text-primary-content">
      <div className="grid grid-cols-2 m-1 text-secondary-content text-sm">
        <div className="justify-self-start"></div>
        <div className="flex justify-end join">
          <span className="join-item mr-2">grouping</span>
          <input
            className="input-xs w-16 join-item !bg-[#222629] !rounded"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const grouping = Number(event.target.value);
              //   dispatch(orderBookSlice.actions.setGrouping(grouping));
            }}
          ></input>
        </div>
      </div>
      <div className="sized-columns">
        <div className="sized-columns mx-2 col-span-4 text-sm font-bold text-secondary-content uppercase">
          <div className="text-start uppercase text-xs font-medium">Order Count</div>
          <div className="text-end uppercase text-xs font-medium">
            price
            <br />({token2Symbol})
          </div>
          <div className="text-end uppercase text-xs font-medium">
            size
            <br />({token2Symbol})
          </div>
          <div className="text-end uppercase text-xs font-medium">
            total
            <br />({token2Symbol})
          </div>
        </div>
      </div>
      <div className="sized-columns mx-2 col-span-4 text-sm">
        {/* {sells.map((props, index) => (
      <OrderBookRow key={'sell-' + index} {...props} />
    ))}

    <CurrentPriceRow />

    {buys.map((props, index) => (
      <OrderBookRow key={'buy-' + index} {...props} />
    ))} */}
      </div>
    </div>
  );
}
