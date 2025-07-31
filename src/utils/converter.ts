import {
  addDays,
  format as dateFnsFormat,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parse,
  isSameDay,
  isYesterday,
  parseISO,
} from "date-fns";

// export const convertToKRW = (amount: number) => {
//   if (amount <= 1000000) {
//     return amount.toLocaleString() + '원';
//   } else if (amount <= 100000000) {
//     const manwon = Math.floor(amount / 10000);
//     // const rest = amount % 10000;
//     // const restStr = rest >= 0 ? `,${rest.toLocaleString()}` : '';
//     return `${manwon.toLocaleString()}만원`;
//   } else {
//     const eok = Math.floor(amount / 100000000);
//     const manwon = Math.floor((amount % 100000000) / 10000);
//     // const rest = amount % 10000;
//     const manwonStr = manwon > 0 ? `${manwon.toLocaleString()}만원` : '';
//     // const restStr = rest > 0 ? `${rest.toLocaleString()}` : '';
//     return `${eok}억${manwonStr}`;
//   }
// };

/**
 * 날짜 변환 함수
 *
 */
export const formattedDate = (
  dateTime: string | number | undefined | null,
  format?: string
) => {
  if (dateTime === undefined || dateTime === null || dateTime === "") {
    return "-";
  }

  // 형식을 넘겨받지 않았을 경우 기본값
  const dateFormat = format || "yyyy.MM.dd";

  let date: Date;

  // 숫자이거나 8자리의 숫자 문자열인 경우 'yyyyMMdd' 형식으로 파싱 (ex. 20201122)
  if (
    (typeof dateTime === "number" && dateTime.toString().length === 8) ||
    (typeof dateTime === "string" && /^\d{8}$/.test(dateTime))
  ) {
    const dateString = dateTime.toString();

    // 'yyyyMMdd' 형식으로 날짜 파싱
    date = parse(dateString, "yyyyMMdd", new Date());
  } else {
    // 그 외의 형식은 기존 방식대로 Date 객체로 변환
    date = new Date(dateTime);
  }

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return dateFnsFormat(date, dateFormat);
};

/**
 *
 * 날짜변환함수2
 *
 */
export const formattedDateToString = (dateTime?: string) => {
  if (!dateTime) return "-";

  const now = new Date();
  const targetDate = new Date(dateTime);

  // 유효하지 않은 날짜인 경우
  if (isNaN(targetDate.getTime())) {
    return "Invalid date";
  }

  // 오늘인 경우
  if (isSameDay(targetDate, now)) {
    return dateFnsFormat(targetDate, "HH:mm a");
  }
  // 어제인 경우
  else if (isYesterday(targetDate)) {
    return "어제";
  }
  // 그 외의 경우
  else {
    return dateFnsFormat(targetDate, "yyyy.MM.dd");
  }
};

const numberUnits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const tenUnits = ["", "십", "백", "천"];
const thousandUnits = ["", "만", "억", "조", "경", "해"];
function chunkAtEnd(value = "", n = 1) {
  const result = [];

  for (let end = value.length; end > 0; end -= n) {
    result.push(value.substring(Math.max(0, end - n), end));
  }
  return result;
}

/**
 * 숫자를 한글로 바꾸는 함수
 * (ex. 백억 칠천팔백사십만 육천오백)
 * */
export const formatNumberAll = (number: number) => {
  return chunkAtEnd(String(number), 4)
    .reduce((acc, item, index) => {
      if (!Number(item)) {
        return acc;
      }

      let numberUnit = "";

      const zeroNum = item.padStart(4, "0");

      for (let i = 0; i < 4; i++) {
        const number = Number(zeroNum[i]);

        if (number) {
          const unit = tenUnits[3 - i];

          numberUnit += `${
            unit && number === 1 ? "" : numberUnits[number]
          }${unit}`;
        }
      }

      const thousandUnit = thousandUnits[index] ?? "";

      return `${numberUnit}${thousandUnit} ${acc}`;
    }, "")
    .trim();
};

type KoreanCurrencyProps = {
  value: string | number | undefined | null;
  toFixed?: number;
  emptyText?: string;
  withoutUnit?: boolean;
  markLessThanTenMillion?: boolean;
};

/* 천원단위 숫자를 00억원 또는 00조원으로 표기(억/조 단위에서 반올림) */
export const convertKoreanCurrency = ({
  value,
  toFixed, // 소수점 단위
  emptyText, // 빈값일때 보여줄 대체텍스트
  withoutUnit, // 끝에 '원' 표기할건지
  markLessThanTenMillion = false, // false일땐, "천만원이하"로 퉁치고, true일땐 "5백만"과 같이 표기
}: KoreanCurrencyProps): string => {
  if (!value) {
    if (!emptyText) {
      return "-";
    }
    return `${emptyText}`;
  }

  let originalValue;
  if (typeof value === "string") {
    originalValue = Number(value);
    // originalValue = Number(value) * 1000;
  } else {
    originalValue = value;
    // originalValue = value * 1000;
  }

  const sign = originalValue < 0 ? "-" : ""; // 음수 부호를 저장
  const absValue = Math.abs(originalValue); // 절대값으로 변환

  const tenMillion = 10000000; // 1천만
  const oneHundredMillion = 100000000; // 1억
  const hundredBillion = 100000000000; // 1천억
  const oneTrillion = 1000000000000; // 1조

  // 소수점 `.0` 제거 => "1.0억원"이 아니라 "1억원"으로 보이도록 함
  const formatValue = (val: string) => {
    const num = Number(val);
    return num % 1 === 0
      ? Number(num.toFixed(0)).toLocaleString()
      : Number(num.toFixed(1)).toLocaleString();
  };

  // 값이 천만보다 작을 때
  if (absValue < tenMillion) {
    if (!markLessThanTenMillion) {
      return "천만 원 미만";
    } else {
      if (absValue >= 10000) {
        // 소수점 처리를 어떻게 할지 결정 (아래 예시는 반올림)
        const manValue = Math.round(absValue / 10000);
        return `${sign}${manValue}만${withoutUnit ? "" : "원"}`;
      } else {
        return `${sign}${absValue}${withoutUnit ? "" : "원"}`;
      }
    }
  }

  // Case 1: 1억 원 미만 (소수점 한 자리로 표시)
  if (absValue < oneHundredMillion) {
    const result = (absValue / oneHundredMillion).toFixed(1); // 1억 기준으로 계산

    return `${sign}${formatValue(result)}억${withoutUnit ? "" : "원"}`;
  }

  // Case 2: 1억 원 이상, 1조 원 미만
  else if (absValue < oneTrillion) {
    const result = (absValue / oneHundredMillion)
      .toFixed(toFixed ?? 0)
      .toLocaleString();

    return `${sign}${formatValue(result)}억${withoutUnit ? "" : "원"}`;
  }

  // Case 3: 1조 원 이상
  else if (absValue >= oneTrillion) {
    const result = (absValue / oneTrillion)
      .toFixed(toFixed ?? 0)
      .toLocaleString();
    return `${sign}${formatValue(result)}조${withoutUnit ? "" : "원"}`;
  }

  // Case 4: 그 외
  return "-";
};

/* dateTime string을 현재기준 'n분 전'으로 변환하는 함수 */
export const getBeforeTime = (date?: string) => {
  if (!date) return "-";

  const now = new Date();

  const hoursDifference = differenceInHours(now, date);
  const minutesDifference = differenceInMinutes(now, date);
  const daysDifference = differenceInDays(now, date);

  if (daysDifference >= 8) {
    return formattedDate(date, "yyyy.MM.dd");
  } else if (daysDifference > 0) {
    return `${daysDifference}일 전`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}시간 전`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference}분 전`;
  } else {
    return "방금 전";
  }
};

/* 최소, 최대값을 받아 "n억원"으로 표기하는 함수 */
export const formatRange = (start?: number | null, end?: number | null) => {
  // 정수값으로 변환
  const startInt = Math.floor(start || 0);
  const endInt = Math.floor(end || 0);

  // 기준값
  const oneHundredMillion = 100000000;
  const tenMillion = 10000000;

  // 조건에 따른 결과 리턴
  if (startInt === 0 && endInt === 0) {
    return "전체";
  }
  if (startInt === 0) {
    if (endInt < tenMillion) return "천만 원 미만";
    return `${endInt / oneHundredMillion}억 이하`;
  }
  // 이건 사실 나올 일 없긴 한데(cuz 최소값이 0보다 큰데 최대값이 0일 수 없으니까) 혹시 몰라 처리는 함
  if (startInt !== 0 && endInt === 0) {
    return `${startInt / oneHundredMillion}억 이상`;
  }

  const formatAmount = (value: number) => {
    if (value < tenMillion) return "천만 원 미만";
    return `${(value / oneHundredMillion).toFixed(4).replace(/\.?0+$/, "")}억`; // 소수점 정리
  };
  return `${formatAmount(startInt)} ~ ${formatAmount(endInt)}`;
};

/* 현재날짜부터 디데이까지 남은 날짜를 "3" 형식으로 반환하는 함수 */
export const calcRemainDays = ({
  originDate,
  targetDays,
}: {
  originDate: string | Date | null | undefined;
  targetDays: number;
}): number => {
  if (!originDate) return 0;

  const target = addDays(new Date(originDate), targetDays);
  const current = new Date();
  const hoursDifference = differenceInHours(target, current); // 시간 차이 계산

  if (hoursDifference < 0) {
    return -1; // 이미 지난 경우
  } else if (hoursDifference < 24) {
    return 1;
  } else if (hoursDifference < 48) {
    return 2;
  } else if (hoursDifference < 72) {
    return 3;
  } else {
    return Math.ceil(hoursDifference / 24); // 3일 이상인 경우
  }
};

/* 현재날짜부터 디데이까지 남은 날짜를 D-n 형식으로 반환하는 함수 */
export const getRemainingDays = (expiresAt: string) => {
  const today = new Date();
  const expireDate = parseISO(expiresAt);
  const remainingDays = differenceInDays(expireDate, today);
  return remainingDays < 0 ? "만료됨" : `D-${remainingDays}`;
};

/* byte 단위를 변환하여 표기해주는 함수 */
type SizeUnit = "Bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
export const formatFileSize = (
  bytes: number,
  decimals: number = 2,
  unit?: SizeUnit
): string => {
  if (bytes === 0) return "0";

  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: SizeUnit[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  let i: number;

  if (unit) {
    i = sizes.indexOf(unit);
    if (i === -1) throw new Error(`Invalid unit: ${unit}`);
  } else {
    i = Math.floor(Math.log(bytes) / Math.log(k));
    if (i >= sizes.length) i = sizes.length - 1;
  }

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/* 배열에서 가장 최신날짜 찾기 */
export const findLatestDate = (
  data?:
    | {
        standardDate?: { value: string } | null;
        [key: string]: any;
      }[]
    | null
) => {
  if (!data || !data.length) return "";

  // null이나 undefined가 아닌 첫 번째 standardDate 찾기
  const firstValidDate = data.find((item) => item.standardDate)?.standardDate;
  if (!firstValidDate) return "";

  const result = data.reduce((latest, current) => {
    if (!current.standardDate) return latest;
    if (!latest) return current.standardDate;

    return latest > current.standardDate ? latest : current.standardDate;
  }, firstValidDate);

  return formattedDate(result?.value);
};
