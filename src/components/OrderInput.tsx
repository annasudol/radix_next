import { useEffect, useState, ChangeEvent } from 'react';

import { getPrecision, getLocaleSeparators, formatNumericString, truncateWithPrecision } from '../utils';
export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}

export declare enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

// List of user actions for CurrencyInputGroup
export enum UserAction {
  UPDATE_PRICE = 'UPDATE_PRICE',
  SET_TOKEN_1 = 'SET_TOKEN_1',
  SET_TOKEN_2 = 'SET_TOKEN_2',
}
export interface ValidationResult {
  valid: boolean;
  message: string;
}

import { useAppDispatch, useAppSelector, useHydrationErrorFix } from '../hooks';
// import { fetchBalances } from 'state/pairSelectorSlice';
// import {
//   OrderSide,
//   OrderType,
//   selectBalanceByAddress,
//   orderInputSlice,
//   UserAction,
//   SpecifiedToken,
//   ValidationResult,
//   fetchQuote,
//   noValidationErrors,
//   pairAddressIsSet,
//   priceIsValid,
//   tokenIsSpecified,
//   submitOrder,
// } from 'state/orderInputSlice';
// import { Calculator } from 'services/Calculator';
// import { DToads } from 'components/DToaster';

// XRD reserved for transaction fees
const XRD_FEE_ALLOWANCE = 3;

interface OrderTypeTabProps {
  orderType: OrderType;
}

interface OrderSideTabProps {
  orderSide: OrderSide;
}

interface CurrencyInputGroupProps {
  disabled?: boolean; // for price input
  userAction: UserAction; // user can set price, token1, token2
}

// Config representing each user action, derived from CurrencyInputGroupProps
interface CurrencyInputGroupConfig {
  label: string;
  currency: string;
  value: number;
  updateValue: (value: number) => void;
  inputValidation: ValidationResult;
  secondaryLabelProps: SecondaryLabelProps;
}

interface CustomNumericIMaskProps {
  value: number;
  separator: string;
  scale: number;
  className: string;
  onAccept: (value: number) => void;
}

interface CurrencyInputProps {
  currency: string;
  value: number;
  updateValue: (value: number) => void;
  inputValidation: ValidationResult;
}

interface LabelProps {
  label: string;
}

interface SecondaryLabelProps {
  disabled: boolean;
  label: string;
  currency: string;
  value: number;
  userAction: UserAction;
  updateValue?: (value: number) => void;
  setPercentageValue?: (percentage: number, isXRD: boolean) => void;
}

interface DisabledInputFieldProps {
  label: string;
}

export function OrderInput() {
  const dispatch = useAppDispatch();
  const pairAddress = useAppSelector((state: { pairSelector: { address: any } }) => state.pairSelector.address);
  const { walletData } = useAppSelector((state: { radix: any }) => state.radix);
  const { type, side, token1, token2, price, specifiedToken } = useAppSelector(
    (state: { orderInput: any }) => state.orderInput,
  );

  // for better readibility
  const isMarketOrder = type === 'MARKET';

  useEffect(() => {
    // dispatch(fetchBalances());
  }, [dispatch, pairAddress]);

  useEffect(() => {
    // dispatch(orderInputSlice.actions.resetUserInput());
  }, [dispatch, side, type]);

  useEffect(() => {
    // dispatch(fetchBalances());
    // dispatch(orderInputSlice.actions.resetUserInput());
  }, [dispatch, walletData]);

  //   useEffect(() => {
  //     if (pairAddressIsSet(pairAddress) && priceIsValid(price, type) && tokenIsSpecified(specifiedToken)) {
  //       dispatch(fetchQuote());
  //     }
  //   }, [dispatch, specifiedToken, token1, token2, price, side, type, pairAddress]);

  return (
    <div className="h-full flex flex-col text-base justify-start items-center">
      <OrderSideTabs />
      OrderSideTabs
      <div className={`p-4 m-auto my-0 h-[570px] w-full`}>
        {/* <OrderTypeTabs />
        <UserInputContainer />
        <SubmitButton /> */}
        {/* {isMarketOrder && (
          <>
            <EstimatedTotalOrQuantity />
            <MarketOrderDisclaimer />
          </>
        )} */}
      </div>
    </div>
  );
}

function OrderSideTabs() {
  return (
    <div
      // OUTSIDE_CONTAINER_MAX_WIDTH
      className={`h-[40px] flex w-full`}
    >
      {[OrderSide.BUY, OrderSide.SELL].map((currentSide, indx) => (
        <OrderSideTab orderSide={currentSide} key={indx} />
      ))}
    </div>
  );
}

function OrderSideTab({ orderSide }: OrderSideTabProps): JSX.Element | null {
  const side = useAppSelector((state: { orderInput: { side: any } }) => state.orderInput.side);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 ${
        side === 'BUY' && orderSide === 'BUY'
          ? 'bg-dexter-green text-content-dark'
          : side === 'SELL' && orderSide === 'SELL'
            ? 'bg-dexter-red text-white'
            : 'opacity-50'
      }`}
      onClick={() => {
        // dispatch(orderInputSlice.actions.resetUserInput());
        // dispatch(orderInputSlice.actions.setSide(orderSide));
      }}
    >
      <p className="font-bold text-sm tracking-[.1px] select-none uppercase">{orderSide}</p>
    </div>
  );
}

// function OrderTypeTabs() {
//   return (
//     <>
//       <div className="h-[40px] flex justify-center">
//         <div className="w-full">
//           <div className="flex h-[40px]">
//             {[OrderType.MARKET, OrderType.LIMIT].map((type, indx) => (
//               <OrderTypeTab orderType={type} key={indx} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function OrderTypeTab({ orderType }: OrderTypeTabProps): JSX.Element | null {
//   const type = useAppSelector((state: { orderInput: { type: any; }; }) => state.orderInput.type);
//   const dispatch = useAppDispatch();

//   return (
//     <div
//       className={`w-[50%] cursor-pointer hover:opacity-100 flex justify-center items-center ${
//         type === orderType ? ' bg-base-100 text-white' : ' bg-base-200 opacity-50'
//       } ${type === 'MARKET' ? 'rounded-tl' : 'rounded-tr'}`}
//       onClick={() => {
//         dispatch(orderInputSlice.actions.setType(orderType));
//       }}
//     >
//       <p className="uppercase font-medium text-sm tracking-[.1px] select-none">{orderType}</p>
//     </div>
//   );
// }

// function EstimatedTotalOrQuantity() {
//   const { quote, quoteDescription } = useAppSelector((state: { orderInput: any; }) => state.orderInput);
//   const amount = quote?.toAmount;
//   const symbol = quote?.toToken?.symbol;
//   return (
//     <div className="flex content-between w-full text-white pb-3 px-2">
//       {amount && (
//         <>
//           <p className="grow text-left">Total:</p>
//           <p className="">
//             ~ {truncateWithPrecision(amount, 2)} {symbol}
//           </p>
//           <InfoTooltip content={quoteDescription} />
//         </>
//       )}
//     </div>
//   );
// }

// function InfoTooltip({ content, iconColor = 'text-white' }: { iconColor?: string; content?: string }) {
//   if (!content) {
//     return <></>;
//   }
//   return (
//     <div className="my-auto ml-2 tooltip text-3xl before:bg-base-300 z-10 font-normal normal-case" data-tip={content}>
//       {/* <AiOutlineInfoCircle className={`${iconColor} text-sm`} /> */}
//     </div>
//   );
// }

// function MarketOrderDisclaimer() {
//   return (
//     <div className="">
//       <p className="text-xs tracking-[0.5px] opacity-70 pb-6 border-b-[1px] border-b-[rgba(255,255,255,0.2)]">
//         display value exact at
//       </p>
//     </div>
//   );
// }

// function SubmitButton() {
//   const isClient = useHydrationErrorFix(); // to fix HydrationError
//   const dispatch = useAppDispatch();
//   const {
//     side,
//     type,
//     token1,
//     quote,
//     quoteDescription,
//     quoteError,
//     validationPrice,
//     validationToken1,
//     validationToken2,
//   } = useAppSelector((state: { orderInput: any; }) => state.orderInput);
//   const { isConnected } = useAppSelector((state: { radix: any; }) => state.radix);
//   const hasQuote = quote !== undefined;
//   const hasQuoteError = quoteError !== undefined;
//   const isLimitOrder = type === OrderType.LIMIT;
//   const isBuyOrder = side === OrderSide.BUY;
//   const disabled =
//     !hasQuote ||
//     hasQuoteError ||
//     !isConnected;

//   // Fix HydrationError
//   if (!isClient) return <></>;

//   return (
//     <button
//       className={`w-full h-[40px] p-3 my-6 rounded ${
//         disabled
//           ? 'bg-[#232629] text-[#474D52] opacity-50'
//           : side === 'BUY'
//             ? 'bg-dexter-green text-black opacity-100'
//             : 'bg-dexter-red text-white opacity-100'
//       }`}
//       onClick={async (e) => {
//         if (!isConnected) {
//           alert('connect_wallet_to_trade');
//           return;
//         }
//         if (disabled) {
//           return;
//         }
//         e.stopPropagation();
//         // DToads.promise(
//         //   // Function input, with following state-to-toast mapping
//         //   // -> pending: loading toast
//         //   // -> rejceted: error toast
//         //   // -> resolved: success toast
//         //   async () => {
//         //     // const action = await dispatch(submitOrder());
//         //     // if (!action.type.endsWith('fulfilled')) {
//         //     //   // Transaction was not fulfilled (e.g. userRejected or userCanceled)
//         //     //   throw new Error('Transaction failed due to user action.');
//         //     // } else if ((action.payload as any)?.status === 'ERROR') {
//         //     //   // Transaction was fulfilled but failed (e.g. submitted onchain failure)
//         //     //   throw new Error('Transaction failed onledger');
//         //     // }
//         //     // dispatch(orderInputSlice.actions.resetUserInput());
//         //     // dispatch(fetchBalances());
//         //   },
//         //   'submitting_order', // Loading message
//         //   'order_submitted', // success message
//         //   'failed_to_submit_order', // error message
//         // );
//       }}
//     >
//       <div className="flex justify-center items-center">
//         <div className="font-bold text-sm tracking-[.1px] uppercase">Submit</div>
//         {isLimitOrder && isConnected && (
//           <InfoTooltip iconColor={isBuyOrder ? 'text-black' : 'text-white'} content={quoteDescription || undefined} />
//         )}
//       </div>
//     </button>
//   );
// }

// function UserInputContainer() {
//   const { side, type } = useAppSelector((state: { orderInput: any; }) => state.orderInput);

//   const isBuyOrder = side === 'BUY';
//   const isSellOrder = side === 'SELL';

//   return (
//     <div className="bg-base-100 px-5 pb-5 rounded-b">
//       <CurrencyInputGroup userAction={UserAction.UPDATE_PRICE} />
//       <CurrencyInputGroup userAction={UserAction.SET_TOKEN_1} />
//       <PercentageSlider />
//       <CurrencyInputGroup userAction={UserAction.SET_TOKEN_2} />
//     </div>
//   );
// }

// Helper function that get config for each possible userAction
// (SET_TOKEN_1, SET_TOKEN_2, UPDATE_PRICE)
function CurrencyInputGroupSettings(
  userAction: UserAction,
  currencyInputGroupDisabled: boolean,
): CurrencyInputGroupConfig {
  const dispatch = useAppDispatch();
  const { side, type, token1, token2, price, specifiedToken, validationPrice, validationToken1, validationToken2 } =
    useAppSelector((state: { orderInput: any }) => state.orderInput);
  const balanceToken1 = useAppSelector((state: any) => 0);
  const balanceToken2 = useAppSelector((state: any) => 0);
  //   const balanceToken2 = useAppSelector((state: any) => selectBalanceByAddress(state, token2.address)) || 0;
  const bestBuy = useAppSelector((state: { orderBook: { bestBuy: any } }) => state.orderBook.bestBuy) || 0;
  const bestSell = useAppSelector((state: { orderBook: { bestSell: any } }) => state.orderBook.bestSell) || 0;

  const updateToken1 = (value: number) => {
    // dispatch(
    // //   orderInputSlice.actions.setTokenAmount({
    // //     amount: value,
    // //     bestBuy,
    // //     bestSell,
    // //     balanceToken1: balanceToken1,
    // //     balanceToken2: balanceToken2,
    // //     specifiedToken: SpecifiedToken.TOKEN_1,
    // //   }),
    // );
  };

  const updateToken2 = (value: number) => {
    // dispatch(
    // //   orderInputSlice.actions.setTokenAmount({
    // //     amount: value,
    // //     bestBuy,
    // //     bestSell,
    // //     balanceToken1: balanceToken1,
    // //     balanceToken2: balanceToken2,
    // //     specifiedToken: SpecifiedToken.TOKEN_2,
    // //   }),
    // );
  };

  // Specifies the amount in % of available balance; If the token to specify is
  // XRD we substract a fee allowance to ensure the user has enough XRD left
  // to pay for transaction fees.
  const setPercentageAmountToken1 = (percentage: number, isXRD: boolean) => {
    if (balanceToken1 <= 0 || percentage < 0 || percentage > 100) {
      return;
    }
    const targetAmount = Math.min(
      isXRD ? balanceToken1 - XRD_FEE_ALLOWANCE : balanceToken1,
      //   Calculator.divide(Calculator.multiply(balanceToken1, percentage), 100),
    );
    // TODO: revert truncating to 8th decimal once adex has fixed adex.createExchangeOrderTx bug
    const targetAmountTruncated = truncateWithPrecision(targetAmount, 8);
    // dispatch(
    //   orderInputSlice.actions.setTokenAmount({
    //     amount: targetAmountTruncated,
    //     bestBuy,
    //     bestSell,
    //     balanceToken1: balanceToken1,
    //     balanceToken2: balanceToken2,
    //     specifiedToken: SpecifiedToken.TOKEN_1,
    //   }),
    // );
  };

  // Specifies the amount in % of available balance; If the token to specify is
  // XRD we substract a fee allowance to ensure the user has enough XRD left
  // to pay for transaction fees.
  const setPercentageAmountToken2 = (percentage: number, isXRD: boolean) => {
    if (balanceToken2 <= 0 || percentage < 0 || percentage > 100) {
      return;
    }
    const targetAmount = Math.min(
      isXRD ? balanceToken2 - XRD_FEE_ALLOWANCE : balanceToken2,
      //   Calculator.divide(Calculator.multiply(balanceToken2, percentage), 100),
    );
    // TODO: revert truncating to 8th decimal once adex has fixed adex.createExchangeOrderTx bug
    const targetAmountTruncated = truncateWithPrecision(targetAmount, 8);
    // dispatch(
    //   orderInputSlice.actions.setTokenAmount({
    //     amount: targetAmountTruncated,
    //     bestBuy,
    //     bestSell,
    //     balanceToken1: balanceToken1,
    //     balanceToken2: balanceToken2,
    //     specifiedToken: SpecifiedToken.TOKEN_2,
    //   }),
    // );
  };

  const updatePrice = (value: number) => {
    // dispatch(
    //   orderInputSlice.actions.setPrice({
    //     price: value,
    //     balanceToken1: balanceToken1,
    //     balanceToken2: balanceToken2,
    //   }),
    // );
  };

  let token1amount = token1.amount;
  let token2amount = token2.amount;
  // For limit orders, tokens that are not specified are derived using price
  // Note: this is only done for display, the state of these tokens will not be set.
  //   if (type === 'LIMIT') {
  //     if (specifiedToken === SpecifiedToken.TOKEN_1 && token1amount >= 0) {
  //       token2amount = Calculator.multiply(token1.amount, price);
  //     }
  //     if (specifiedToken === SpecifiedToken.TOKEN_2) {
  //       token1amount = price <= 0 ? 0 : Calculator.divide(token2.amount, price);
  //     }
  //   }

  const configMap: { [key in UserAction]: CurrencyInputGroupConfig } = {
    SET_TOKEN_1: {
      label: 'quantity',
      currency: token1.symbol,
      value: token1amount,
      updateValue: updateToken1,
      inputValidation: validationToken1,
      secondaryLabelProps: {
        disabled: side === 'BUY', // hide token1 balance for BUY
        label: 'available',
        currency: token1.symbol,
        value: truncateWithPrecision(balanceToken1, 8), // TODO(dcts): use coin-decimals
        setPercentageValue: setPercentageAmountToken1,
        userAction: UserAction.SET_TOKEN_1,
      },
    },
    SET_TOKEN_2: {
      label: 'total',
      currency: token2.symbol,
      value: token2amount,
      updateValue: updateToken2,
      inputValidation: validationToken2,
      secondaryLabelProps: {
        disabled: side === 'SELL', // hide token2 balance for SELL
        label: 'available',
        currency: token2.symbol,
        value: truncateWithPrecision(balanceToken2, 8), // TODO(dcts): use coin-decimals
        setPercentageValue: setPercentageAmountToken2,
        userAction: UserAction.SET_TOKEN_2,
      },
    },
    UPDATE_PRICE: {
      label: 'price',
      currency: token2.symbol,
      value: price,
      updateValue: updatePrice,
      inputValidation: validationPrice,
      secondaryLabelProps: {
        disabled: currencyInputGroupDisabled, // hide if currencyInput is disabled (e.g. for market price)
        label: side === 'BUY' ? 'Best buy' : 'Best sell',
        currency: token2.symbol,
        value: truncateWithPrecision(side === 'BUY' ? bestBuy : bestSell, 8), // TODO(dcts): use coin-decimals
        updateValue: updatePrice,
        userAction: UserAction.UPDATE_PRICE,
      },
    },
  };

  return configMap[userAction];
}

// Container with main label (top left), secondary label (top right) and input field
function CurrencyInputGroup({ disabled = false, userAction }: CurrencyInputGroupProps): JSX.Element | null {
  const { type } = useAppSelector((state: { orderInput: any }) => state.orderInput);
  const { label, currency, value, updateValue, inputValidation, secondaryLabelProps } = CurrencyInputGroupSettings(
    userAction,
    disabled,
  );

  const isMarketOrder = type === 'MARKET';
  const isUserActionUpdatePrice = userAction === 'UPDATE_PRICE';
  return (
    <div className="pt-5 relative">
      {!inputValidation.valid && <InputTooltip message={inputValidation.message} />}
      <div className="w-full flex content-between">
        <Label label={label} />
        <SecondaryLabel {...secondaryLabelProps} />
      </div>
      {/* conditionally show disabled MARKET price label */}
      {isMarketOrder && isUserActionUpdatePrice ? (
        <DisabledInputField label={'market'} />
      ) : (
        <CurrencyInput currency={currency} value={value} updateValue={updateValue} inputValidation={inputValidation} />
      )}
    </div>
  );
}

function Label({ label }: LabelProps): JSX.Element | null {
  return <p className="text-xs font-medium text-left opacity-50 pb-1 tracking-[0.5px] grow select-none">{label}:</p>;
}

// Right Label: e.g. "Best Buy/Sell Price" or "Available Balance".
// Can be empty/disabled (for example for Market Price)
function SecondaryLabel({
  disabled,
  label,
  currency,
  value,
  updateValue,
  setPercentageValue,
  userAction,
}: SecondaryLabelProps): JSX.Element | null {
  return disabled ? (
    <></>
  ) : (
    <p
      className="text-xs font-medium text-white underline mr-1 cursor-pointer tracking-[0.1px] text-right"
      onClick={
        userAction === UserAction.UPDATE_PRICE && updateValue
          ? () => updateValue(value)
          : setPercentageValue
            ? () => setPercentageValue(100, currency === 'XRD')
            : () => {}
      }
    >
      {label}: {value === 0 ? 0 : truncateWithPrecision(value, getPrecision(currency))} {currency}
    </p>
  );
}

function DisabledInputField({ label }: DisabledInputFieldProps): JSX.Element | null {
  return (
    <div className="h-[40px] w-full content-between bg-base-200 flex relative rounded-lg border-[1.5px] border-dashed border-[#768089]">
      <div className="uppercase text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#768089] select-none">
        {label}
      </div>
    </div>
  );
}

function CurrencyInput({ currency, value, updateValue, inputValidation }: CurrencyInputProps): JSX.Element | null {
  const { decimalSeparator } = getLocaleSeparators();
  const scale = 8; // TODO(dcts): use token specific decimals
  return (
    <>
      <div
        className={`h-[40px] w-full content-between bg-base-200 flex rounded-lg ${
          inputValidation.valid ? 'hover:outline hover:outline-1 hover:outline-white/50' : 'border-2 border-red-500'
        }`}
      >
        {/* UserInput */}
        <CustomNumericIMask
          value={value}
          separator={decimalSeparator}
          scale={scale}
          onAccept={updateValue}
          className="text-sm grow w-full text-right pr-2 bg-base-200 rounded-lg"
        />
        {/* CurrencyLabel */}
        <div className="text-sm shrink-0 bg-base-200 content-center items-center flex pl-2 pr-4 rounded-r-md">
          {currency}
        </div>
      </div>
    </>
  );
}

function InputTooltip({ message }: { message: string }) {
  return (
    <div className="absolute bottom-[-20px] z-10 right-0 p-1">
      <p className="text-xs tracking-[0.5px] truncate text-red-500 text-center">{message}</p>
    </div>
  );
}

// TODO(dcts): implement percentage slider in future PR
function PercentageSlider() {
  return <></>;
}

// Mimics IMask with improved onAccept, triggered only by user input to avoid rerender bugs.
function CustomNumericIMask({
  value,
  separator,
  scale,
  onAccept,
  className,
}: CustomNumericIMaskProps): JSX.Element | null {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    // Automatically convert "," to "."
    value = value.replace(/,/g, separator).replace(/-/g, '');
    if (value.startsWith('.') || value.startsWith(',')) {
      value = value.substring(1, value.length);
    }
    if (value === '') {
      // If the input is cleared, set the internal state to an empty string
      // and reset token amount state to 0
      setInputValue('');
      onAccept(-1);
      return; // Exit early as there's no further processing needed
    }
    const formattedValue = formatNumericString(value, separator, scale);
    setInputValue(formattedValue);
    // Regex that limits precision to defined "scale" and allows a single
    // dot between digits or at the very end
    const regexForAccept = new RegExp(`^\\d+(\\.\\d{1,${scale}})?$`);
    if (regexForAccept.test(formattedValue)) {
      onAccept(parseFloat(formattedValue));
    }
  };

  // Update local state when the prop value changes
  useEffect(() => {
    setInputValue(formatNumericString(value.toString(), separator, scale));
  }, [value, separator, scale]);

  return (
    <input
      type="text"
      value={inputValue === '-1' ? '' : inputValue}
      onChange={handleChange}
      className={className} // Add TailwindCSS classes here
    />
  );
}
