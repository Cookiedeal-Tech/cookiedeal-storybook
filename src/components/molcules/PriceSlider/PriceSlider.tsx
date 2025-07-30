import React, {
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
  useMemo,
} from 'react';
import styled from 'styled-components';
import Chip from '@/components/commons/Chip';

type Props = {
  sliderSteps?: number[];
  onCompleteChange: ({
    start,
    end,
  }: {
    start: number | undefined;
    end: number | undefined;
  }) => void;
  hasButtons?: boolean; // 버튼 표시 여부
  showRangeTexts?: boolean; // 바 하단 텍스트 표시 여부
  defaultValues?: [number | string | undefined, number | string | undefined];
  resetTrigger?: boolean;
};

const PriceSlider = ({
  sliderSteps = [0, 10, 20, 30, 50, 80, 100, 500],
  onCompleteChange,
  hasButtons,
  showRangeTexts = true,
  defaultValues,
  resetTrigger,
}: Props) => {
  const totalSteps = useMemo(
    () => (sliderSteps.length - 1) * 10, // 각 구간을 10틱으로 나눔
    [sliderSteps],
  );

  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState<boolean | undefined>(undefined);
  const [selectedChip, setSelectedChip] = useState<number | undefined>();

  const getSliderValue = (step: number | undefined): number | undefined => {
    if (step === undefined) return undefined;

    for (let i = 0; i < sliderSteps.length - 1; i++) {
      const rangeStart = sliderSteps[i];
      const rangeEnd = sliderSteps[i + 1];
      const stepCount = 10;
      const stepSize = (rangeEnd - rangeStart) / stepCount;

      if (step >= i * stepCount && step < (i + 1) * stepCount) {
        return rangeStart + (step - i * stepCount) * stepSize;
      }
    }
    return sliderSteps[sliderSteps.length - 1];
  };

  const handleMove = (
    event: MouseEvent | TouchEvent,
    handleType: 'min' | 'max',
  ) => {
    const sliderRect = (event.target as HTMLElement)
      .closest('.slider-container')
      ?.getBoundingClientRect();
    if (!sliderRect) return;

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const x = clientX - sliderRect.left;
    const percentage = Math.max(0, Math.min(1, x / sliderRect.width));
    let newStep = Math.round(percentage * totalSteps);

    // 기존 로직: 맨 오른쪽을 넘어가면 maxValue=undefined
    if (handleType === 'max' && newStep >= totalSteps) {
      setMaxValue(undefined);
      return;
    }

    // min 핸들 움직임
    if (handleType === 'min') {
      // (maxValue가 undefined이거나, newStep <= maxValue)이면 그냥 minValue = newStep
      if (maxValue === undefined || newStep <= maxValue) {
        setMinValue(newStep);
      } else {
        // newStep이 maxValue보다 크면 교차 → swap
        setMinValue(maxValue);
        setMaxValue(newStep);
      }
    }
    // max 핸들 움직임
    else {
      // (minValue가 undefined이거나, newStep >= minValue)이면 그냥 maxValue = newStep
      if (minValue === undefined || newStep >= minValue) {
        setMaxValue(newStep);
      } else {
        // newStep이 minValue보다 작으면 교차 → swap
        setMaxValue(minValue);
        setMinValue(newStep);
      }
    }
  };

  const handleDragStart = (
    event: React.MouseEvent | React.TouchEvent,
    handleType: 'min' | 'max',
  ) => {
    event.preventDefault();
    setIsDragging(true);

    const onMove = (e: MouseEvent | TouchEvent) => handleMove(e, handleType);
    const onEnd = () => {
      setIsDragging(false);
      setSelectedChip(undefined);
      document.removeEventListener(
        'mousemove',
        onMove as unknown as EventListener,
      );
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener(
        'touchmove',
        onMove as unknown as EventListener,
      );
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove as unknown as EventListener);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove as unknown as EventListener);
    document.addEventListener('touchend', onEnd);
  };

  const handleButtonClick = (value: number) => {
    const stepIndex = sliderSteps.findIndex((step) => step === value);
    setSelectedChip(stepIndex);

    let newMinValue: number | undefined;
    let newMaxValue: number | undefined;

    if (stepIndex === 0) {
      newMinValue = undefined;
      newMaxValue = undefined;
    } else if (stepIndex === sliderSteps.length - 1) {
      newMinValue = stepIndex * 10;
      newMaxValue = undefined;
    } else if (stepIndex !== -1) {
      newMinValue = 0;
      newMaxValue = stepIndex * 10;
    }

    setMinValue(newMinValue);
    setMaxValue(newMaxValue);

    // 버튼 클릭 후 바로 콜백 호출
    onCompleteChange({
      start:
        newMinValue !== undefined ? getSliderValue(newMinValue) : undefined,
      end: newMaxValue !== undefined ? getSliderValue(newMaxValue) : undefined,
    });
  };

  // defaultValues 설정 때문에 추가
  const getStepFromValue = (value: number): number => {
    for (let i = 0; i < sliderSteps.length - 1; i++) {
      if (value >= sliderSteps[i] && value <= sliderSteps[i + 1]) {
        const rangeStart = sliderSteps[i];
        const rangeEnd = sliderSteps[i + 1];
        const stepCount = 10;
        const stepSize = (rangeEnd - rangeStart) / stepCount;

        return i * stepCount + Math.round((value - rangeStart) / stepSize);
      }
    }
    return 0;
  };

  useEffect(() => {
    if (defaultValues) {
      let newMinStep: number | undefined;
      let newMaxStep: number | undefined;

      // (1) "min=500, max=0 or undefined" 케이스를 먼저 처리
      if (
        Number(defaultValues[0]) === 500 &&
        (defaultValues[1] === 0 || defaultValues[1] === undefined)
      ) {
        // 둘 다 70(=500억)에 맞춰 두 핸드를 모두 오른쪽 끝으로
        newMinStep = totalSteps; // 70
        newMaxStep = totalSteps; // 70
      }
      // (2) 일반 케이스: 기존 로직
      else {
        newMinStep =
          defaultValues[0] !== undefined && defaultValues[0] !== null
            ? getStepFromValue(Number(defaultValues[0]))
            : undefined;
        newMaxStep =
          defaultValues[1] !== undefined && defaultValues[1] !== null
            ? getStepFromValue(Number(defaultValues[1]))
            : undefined;
      }

      setMinValue(newMinStep);
      setMaxValue(newMaxStep);
    }
  }, [defaultValues]);

  // 나머지 로직은 동일

  const getPositions = (
    minValue: number | undefined,
    maxValue: number | undefined,
    totalSteps: number,
  ) => {
    // 둘 다 undefined면 전체범위로 간주
    if (minValue === undefined && maxValue === undefined) {
      return { minPos: 0, maxPos: 100 };
    }

    // // 둘 다 0이면 핸들이 둘 다 왼쪽으로 가있도록
    // else if (minValue === 0 && maxValue === 0) {
    //   return { minPos: 0, maxPos: 0 };
    // }

    // 일반적인 케이스
    const minPos = minValue !== undefined ? (minValue / totalSteps) * 100 : 0;
    const maxPos = maxValue !== undefined ? (maxValue / totalSteps) * 100 : 100;

    return { minPos, maxPos };
  };

  // 실제 렌더링 시 “둘 다 0” 혹은 “둘 다 undefined”이면 왼쪽 0%, 오른쪽 100%로 표시
  const { minPos, maxPos } = useMemo(() => {
    return getPositions(minValue, maxValue, totalSteps);
  }, [minValue, maxValue, totalSteps]);

  useEffect(() => {
    if (isDragging !== undefined && !isDragging) {
      onCompleteChange({
        start: minValue !== undefined ? getSliderValue(minValue) : undefined,
        end: maxValue !== undefined ? getSliderValue(maxValue) : undefined,
      });
    }
  }, [isDragging]);

  useEffect(() => {
    if (resetTrigger) {
      setMinValue(undefined);
      setMaxValue(undefined);
      setSelectedChip(undefined);
    }
  }, [resetTrigger]);

  // 라벨 텍스트를 추가로 분기해 주는 헬퍼
  const getMinLabelText = (): string => {
    // 1) min=0, max=0 -> "0"
    if (minValue === 0 && maxValue === 0) {
      return '0';
    }
    // 2) min=500, max=0 => minValue = totalSteps(=70), maxValue=0 => ''
    if (minValue === totalSteps && maxValue === 0) {
      return '';
    }
    // 3) min=undefined, max=undefined -> "0"
    if (minValue === undefined && maxValue === undefined) {
      return '0';
    }
    if (minValue === maxValue) {
      return '';
    }
    // 기본
    return minValue !== undefined ? `${getSliderValue(minValue)}억` : '0';
  };

  const getMaxLabelText = (): string => {
    // 1) min=0, max=0 -> "500억+"
    if (minValue === 0 && maxValue === 0) {
      return '';
    }
    // 2) min=500, max=0 -> "500억+"
    if (minValue === totalSteps && maxValue === 0) {
      return '500억+';
    }
    // 3) min=500 & max=500 => 둘 다 500억이면 "500억+"
    if (minValue === totalSteps && maxValue === totalSteps) {
      return '500억+';
    }
    // 기본
    return maxValue !== undefined
      ? `${getSliderValue(maxValue)}억`
      : `${sliderSteps[sliderSteps.length - 1]}억+`;
  };

  // 둘 다 최댓값 -> min 라벨 숨기기
  const isBothAtMax = minValue === totalSteps && maxValue === undefined;

  return (
    <SliderContainer className="slider-container">
      <div style={{ position: 'relative' }}>
        <Handle
          style={{
            left: `${minPos}%`,
            zIndex: 3,
          }}
          onMouseDown={(e) => handleDragStart(e, 'min')}
          onTouchStart={(e) => handleDragStart(e, 'min')}
        >
          <Label style={{ display: isBothAtMax ? 'none' : 'block' }}>
            {getMinLabelText()}
          </Label>
        </Handle>
        <Handle
          style={{
            left: `${maxPos}%`,
            zIndex: 2,
          }}
          onMouseDown={(e) => handleDragStart(e, 'max')}
          onTouchStart={(e) => handleDragStart(e, 'max')}
        >
          <Label>{getMaxLabelText()}</Label>
        </Handle>
        <Track />
        <Range style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }} />

        {showRangeTexts &&
          sliderSteps.map((step, index) => (
            <React.Fragment key={index}>
              <Tick
                style={{
                  left: `${(index / (sliderSteps.length - 1)) * 100}%`,
                }}
              />
              <TickLabel
                style={{
                  left: `${(index / (sliderSteps.length - 1)) * 100}%`,
                }}
              >
                {step}억
              </TickLabel>
            </React.Fragment>
          ))}
      </div>

      {hasButtons && (
        <ButtonContainer>
          {sliderSteps.map((step, index) => (
            <Chip
              key={index}
              checked={selectedChip === index}
              onClick={() => handleButtonClick(step)}
            >
              {index === 0 && '전체'}
              {index !== 0 && index !== sliderSteps.length - 1 && `~${step}억`}
              {index === sliderSteps.length - 1 && `${step}억~`}
            </Chip>
          ))}
        </ButtonContainer>
      )}
    </SliderContainer>
  );
};

export default PriceSlider;

const SliderContainer = styled.div`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 3.5rem;
  padding-top: 3rem;

  ${({ theme }) => theme.device.belowTablet} {
    padding: 1.2rem;
    padding-top: 2rem;
  }
`;

const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundDefaultStrong};
  transform: translateY(-50%);
`;

const Range = styled.div`
  position: absolute;
  top: 50%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundBrandNormal};
  transform: translateY(-50%);
`;

const Handle = styled.div`
  position: absolute;
  top: 50%;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0px 1px 2px 0px #0000001f;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Label = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textBrandNormal};
  ${({ theme }) => theme.typos.label2Bold};
`;

const Tick = styled.div`
  position: absolute;
  top: -0.25rem;
  height: 0.5rem;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.borderDefaultWeaker};
`;

const TickLabel = styled.div`
  position: absolute;
  top: 1.25rem;
  transform: translateX(-50%);
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textDefaultNormal};
  ${({ theme }) => theme.typos.label2Medium};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;
