import { useState, useCallback, useEffect, useRef } from 'react';
import Tag from '@/components/commons/Tag';
import { toast } from 'react-toastify';
import Button from '@/components/commons/Button';
import Typo from '@/components/commons/Typo';
import Flex from '@/components/commons/Flex';
import Input from '@/components/commons/Input';

type Props = {
  onChange: (values: string[]) => void;
  placeholder?: string;
  hintText?: string;
  defaultValues?: string[];
  rules?:
    | { maxInputLength: number }
    | { regex: 'email' }
    | { maxCount: number };
};

const KeywordSelectInput = ({
  onChange,
  placeholder = '키워드를 입력하세요',
  defaultValues,
  rules,
  hintText,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const onChangeRef = useRef(onChange);

  // onChange 함수를 ref에 저장
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // defaultValues가 있을 때 초기화
  useEffect(() => {
    if (defaultValues) {
      setTags(defaultValues);
      onChangeRef.current(defaultValues);
    }
  }, [defaultValues]);

  // tags 상태가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    onChangeRef.current(tags);
  }, [tags]);

  const addTag = useCallback(
    (value: string) => {
      if (isAddingTag) return; // 중복 실행 방지

      const trimmedValue = value.trim();

      if (!trimmedValue) return;

      setIsAddingTag(true);

      setTags((prevTags) => {
        // 중복 키워드 체크
        if (prevTags.includes(trimmedValue)) {
          toast.error('이미 존재하는 키워드입니다');
          return prevTags;
        }

        // maxCount 체크
        if (rules && 'maxCount' in rules) {
          if (prevTags.length >= rules.maxCount) {
            toast.error(`최대 ${rules.maxCount}개까지 입력할 수 있습니다.`);
            return prevTags;
          }
        }

        // email regex 체크
        if (rules && 'regex' in rules && rules.regex === 'email') {
          if (!emailRegex.test(trimmedValue)) {
            toast.error('이메일 형식이 아닙니다');
            return prevTags;
          }
        }

        const newTags = [...prevTags, trimmedValue];
        return newTags;
      });

      setInputValue('');
      setIsAddingTag(false);
    },
    [rules, emailRegex, isAddingTag],
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      const newTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(newTags);
    },
    [tags],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // maxInputLength 체크
      if (rules && 'maxInputLength' in rules) {
        if (newValue.length <= rules.maxInputLength) {
          setInputValue(newValue);
        }
      } else {
        setInputValue(newValue);
      }
    },
    [rules],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter 키만 처리하고 나머지는 무시
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        const currentValue = e.currentTarget.value;

        addTag(currentValue);
      }
    },
    [addTag],
  );

  const handleButtonClick = useCallback(() => {
    addTag(inputValue);
  }, [inputValue, addTag]);

  return (
    <Flex $isFull $align="start" $direction="column" $gap={{ row: 16 }}>
      <Flex $align="start" $isFull $direction="column" $gap={{ row: 8 }}>
        <Flex $isFull $gap={{ column: 8 }}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyDown}
            placeholder={placeholder}
          />
          <Button
            onClick={handleButtonClick}
            disabled={!inputValue.trim()}
            $size="large"
            $variant="outlineSecondary"
          >
            추가
          </Button>
        </Flex>

        {hintText && (
          <Typo $variant="caption1Regular" $color="textDefaultWeak">
            {hintText}
          </Typo>
        )}
      </Flex>

      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Tag key={tag} isDeletable onDeleteClick={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default KeywordSelectInput;
