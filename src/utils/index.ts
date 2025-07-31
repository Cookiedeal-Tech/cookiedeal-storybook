export function formatDate(inputDate: string): string {
  // inputDate가 8자리인지 확인
  if (inputDate.length !== 8) {
    throw new Error("Input date must be in YYYYMMDD format.");
  }

  // 년, 월, 일을 분리
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  // YYYY.MM.DD 형식으로 변환
  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function truncateString(str: string, maxLength: number = 20): string {
  if (!str) return str;
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
}

export function convertDealType(code: string) {
  switch (code) {
    case "mna":
      return "M&A";
    case "new":
      return "신주";
    case "secondary":
      return "구주";
    default:
      return "알 수 없음";
  }
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertAndFormatBytes(
  bytes: number,
  decimals?: number
): string {
  const rawConvertedValue = formatBytes(bytes, decimals);
  const parts = rawConvertedValue.split(" ");
  const formattedNumber = numberWithCommas(parseFloat(parts[0]));
  return `${formattedNumber} ${parts[1]}`;
}

export function getAskingPriceString(
  minAskingPrice: number,
  maxAskingPrice: number
): string {
  if (minAskingPrice === maxAskingPrice) {
    if (minAskingPrice === 0) {
      return "문의";
    }
    return `${minAskingPrice}억`;
  } else {
    return `${minAskingPrice}억 ~ ${maxAskingPrice}억`;
  }
}

export function getDealSourceStatus(status: string): string {
  switch (status) {
    case "created":
      return "생성 완료";
    case "in-review":
      return "심사중";
    case "approved":
      return "승인됨";
    case "pending-contract":
      return "계약 대기중";
    case "contracted":
      return "계약 완료";
    case "rejected":
      return "거부됨";
    default:
      return "알 수 없음";
  }
}

export function getDealStatus(status: string): string {
  switch (status) {
    case "created":
      return "생성 완료";
    case "in-review":
      return "심사중";
    case "approved":
      return "승인됨";
    case "pending-contract":
      return "계약 대기중";
    case "contracted":
      return "계약 완료";
    case "rejected":
      return "거부됨";
    default:
      return "알 수 없음";
  }
}

export function convertDealSide(side: string): string {
  switch (side) {
    case "buy":
      return "매수";
    case "sell":
      return "매도";
    default:
      return "알 수 없음";
  }
}

export function objectToQueryString(obj: any): string {
  // deep copy 가 아니라 shallow copy 이므로 원본 객체를 변경하지 않음
  obj = { ...obj };

  // key value 에서 value 값이 null 이거나 undefined 인 경우 제외
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
    // 배열인데 배열의 길이가 0인 경우 제외
    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      delete obj[key];
    }
  }
  // 배열인 경우에는 배열의 값들을 , 로 구분하여 문자열로 변환
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].join(",");
    }
  }
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
