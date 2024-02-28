'use client';
import { useEffect, useState } from 'react';
import AppPie from './../components/pieChart';
import styles from './page.module.css';

// Utility function to convert number to formatted string
const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};
const checkForNumeric = (value: string): number => {
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const isNumeric = !isNaN(numericValue);
  return isNumeric ? numericValue : 0;
};

export default function Home() {
  const [homePrice, setHomePrice] = useState('1,000,000');
  const [downPayment, setDownPayment] = useState('200,000');
  const [paymentPercentage, setPaymentPercentage] = useState('20');
  const [loanTerm, setLoanTerm] = useState(5);
  const [interestRate, setInterestRate] = useState('10');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [tpm, setTpm] = useState('');
  const [ipm, setIpm] = useState('');
  const [pmi, setPmi] = useState('1000');
  const [hoa, setHoa] = useState('');

  const calculateMortgage = () => {
    const loanAmount =
      checkForNumeric(homePrice) - checkForNumeric(downPayment);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    if (
      !isNaN(loanAmount) &&
      !isNaN(monthlyInterestRate) &&
      !isNaN(numberOfPayments)
    ) {
      console.log('tpm', checkForNumeric(tpm));
      const mortgagePayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      const finalMortgagePayment =
        mortgagePayment +
        checkForNumeric(tpm) +
        checkForNumeric(ipm) +
        checkForNumeric(pmi) +
        checkForNumeric(hoa);
      setMonthlyPayment(finalMortgagePayment.toFixed(2));
    } else {
      setMonthlyPayment('');
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate, tpm, ipm, pmi, hoa]);

  const handleHomePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (Boolean(checkForNumeric(inputValue))) {
      setHomePrice(formatNumber(checkForNumeric(inputValue)));
      if (downPayment) {
        const calculatedPercentage =
          (checkForNumeric(downPayment) / checkForNumeric(inputValue)) * 100;
        setPaymentPercentage(
          `${calculatedPercentage <= 100 ? calculatedPercentage : 100}`
        );
      }
      return;
    }
    setHomePrice('');
  };

  const handleDownPaymentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      const currentInputValue = checkForNumeric(inputValue);
      const homePriceValue = checkForNumeric(homePrice);
      const paymentPercentage = (currentInputValue / homePriceValue) * 100;
      const actualPaymentPercentage =
        paymentPercentage > 100 ? 100 : paymentPercentage;
      setDownPayment(formatNumber(currentInputValue));
      setPaymentPercentage(
        `${
          !Number.isInteger(actualPaymentPercentage)
            ? actualPaymentPercentage.toFixed(2)
            : actualPaymentPercentage
        }`
      );
      return;
    }
    setDownPayment('');
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      if (checkForNumeric(inputValue) <= 100) {
        setPaymentPercentage(inputValue);
        setDownPayment(
          formatNumber((checkForNumeric(homePrice) * +inputValue) / 100)
        );
      }
      return;
    }
    setPaymentPercentage('');
  };

  const handleInterestRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (Boolean(checkForNumeric(inputValue))) {
      if (checkForNumeric(inputValue) <= 100)
        setInterestRate(checkForNumeric(inputValue).toString());
      return;
    }
    setInterestRate('');
  };

  const handleTpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      setTpm(formatNumber(checkForNumeric(inputValue)));
      return;
    }
    setTpm('');
  };

  const handleIpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      setIpm(formatNumber(checkForNumeric(inputValue)));
      return;
    }
    setIpm('');
  };

  const handlePmiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      setPmi(formatNumber(checkForNumeric(inputValue)));
      return;
    }
    setPmi('');
  };

  const handleHoaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Boolean(checkForNumeric(inputValue))) {
      setHoa(formatNumber(checkForNumeric(inputValue)));
      return;
    }
    setHoa('');
  };

  return (
    <>
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h4>Yearly expenses</h4>
          <div className={styles.innerContainer}>
            <label htmlFor='principal'>Home price</label>
            <input
              id='principal'
              type='text'
              placeholder='principal'
              value={homePrice}
              onChange={handleHomePriceChange}
            />
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='down'>Down payment</label>
            <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
              <input
                id='down'
                style={{ flexGrow: 1 }}
                type='text'
                placeholder='1,100(amount)'
                value={downPayment}
                onChange={handleDownPaymentChange}
              />
              <input
                type='text'
                placeholder='%'
                style={{ width: '20%' }}
                value={paymentPercentage}
                onChange={handleRateChange}
              />
            </div>
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='term'>Loan term</label>
            <select
              id='term'
              value={loanTerm}
              onChange={(e) => setLoanTerm(+e.target.value)}
            >
              <option value={5}>5 years</option>
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={25}>25 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='interestRate'>Interest rate</label>
            <input
              id='interestRate'
              type='text'
              placeholder='%'
              value={interestRate}
              onChange={handleInterestRateChange}
            />
          </div>
          <h4>Monthly expenses</h4>
          <div className={styles.innerContainer}>
            <label htmlFor='tax'>Property tax per month</label>
            <input
              id='tax'
              type='text'
              placeholder='1,000'
              value={tpm}
              onChange={handleTpmChange}
            />
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='insurance'>Insurance per month</label>
            <input
              id='insurance'
              type='text'
              placeholder='1,000'
              value={ipm}
              onChange={handleIpmChange}
            />
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='pmi'>PMI per month</label>
            <input
              id='pmi'
              type='text'
              placeholder='1,000'
              value={pmi}
              onChange={handlePmiChange}
            />
          </div>
          <div className={styles.innerContainer}>
            <label htmlFor='hoa'>HOA fee per month</label>
            <input
              id='hoa'
              type='text'
              placeholder='1,000'
              value={hoa}
              onChange={handleHoaChange}
            />
          </div>
        </div>
        <div></div>
      </main>
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          left: '50%',
          bottom: 0,
          backgroundColor: '#eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Mortgage calculator</h1>
        <AppPie
          mortgage={+monthlyPayment}
          data01={[
            {
              name: 'Principal and interest',
              value:
                +monthlyPayment -
                checkForNumeric(tpm) -
                checkForNumeric(ipm) -
                checkForNumeric(pmi) -
                checkForNumeric(hoa),
            },
            {
              name: 'Other monthly expenses',
              value:
                checkForNumeric(tpm) +
                checkForNumeric(ipm) +
                checkForNumeric(pmi) +
                checkForNumeric(hoa),
            },
          ]}
        />
      </div>
    </>
  );
}
