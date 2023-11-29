const numberToWords = (number) => {
    const units = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
    const teens = [
      '',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
  
    const convertChunkToWords = (chunk) => {
      let words = '';
  
      if (chunk >= 100) {
        words += units[Math.floor(chunk / 100)] + ' Hundred ';
        chunk %= 100;
      }
  
      if (chunk >= 11 && chunk <= 19) {
        words += teens[chunk - 10] + ' ';
        return words;
      } else if (chunk >= 10 || chunk >= 20) {
        words += tens[Math.floor(chunk / 10)] + ' ';
        chunk %= 10;
      }
  
      if (chunk > 0) {
        words += units[chunk] + ' ';
      }
  
      return words;
    };
  
    if (number === 0) {
      return 'Zero';
    }
  
    let words = '';
  
    if (number < 0) {
      words += 'Negative ';
      number = Math.abs(number);
    }
  
    if (number >= 1e9) {
      words += convertChunkToWords(Math.floor(number / 1e9)) + 'Billion ';
      number %= 1e9;
    }
  
    if (number >= 1e6) {
      words += convertChunkToWords(Math.floor(number / 1e6)) + 'Million ';
      number %= 1e6;
    }
  
    if (number >= 1e3) {
      words += convertChunkToWords(Math.floor(number / 1e3)) + 'Thousand ';
      number %= 1e3;
    }
  
    words += convertChunkToWords(number);
  
    return words.trim();
  };
  
  export default numberToWords;
  