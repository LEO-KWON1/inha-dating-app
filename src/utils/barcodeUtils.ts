import { BarcodeScanResult } from '../types';

/**
 * 바코드 데이터에서 학번을 추출합니다.
 * 인하대학교 학번은 10자리 숫자입니다.
 */
export const extractStudentNumber = (barcodeData: string): string | null => {
  // 바코드 데이터에서 숫자만 추출
  const numbers = barcodeData.replace(/\D/g, '');
  
  // 10자리 숫자인지 확인 (인하대학교 학번 형식)
  if (numbers.length === 10 && /^\d{10}$/.test(numbers)) {
    return numbers;
  }
  
  // 8자리 숫자인지 확인 (일부 대학 학번 형식)
  if (numbers.length === 8 && /^\d{8}$/.test(numbers)) {
    return numbers;
  }
  
  return null;
};

/**
 * 추출된 학번이 유효한지 검증합니다.
 */
export const validateStudentNumber = (studentNumber: string): boolean => {
  // 기본 형식 검증
  if (!/^\d{8,10}$/.test(studentNumber)) {
    return false;
  }
  
  // 인하대학교 학번 패턴 검증 (예: 2020xxxxxx)
  const currentYear = new Date().getFullYear();
  const year = parseInt(studentNumber.substring(0, 4));
  
  // 학번의 연도가 현재 연도보다 10년 이전이거나 미래가 아닌지 확인
  if (year < currentYear - 10 || year > currentYear + 1) {
    return false;
  }
  
  return true;
};

/**
 * 바코드 스캔 결과를 처리하고 학번을 반환합니다.
 */
export const processBarcodeScan = (scanResult: BarcodeScanResult): string | null => {
  try {
    const studentNumber = extractStudentNumber(scanResult.data);
    
    if (studentNumber && validateStudentNumber(studentNumber)) {
      return studentNumber;
    }
    
    return null;
  } catch (error) {
    console.error('바코드 처리 중 오류 발생:', error);
    return null;
  }
};

/**
 * 학번을 마스킹 처리합니다 (보안용).
 */
export const maskStudentNumber = (studentNumber: string): string => {
  if (studentNumber.length === 10) {
    return `${studentNumber.substring(0, 4)}****${studentNumber.substring(8)}`;
  } else if (studentNumber.length === 8) {
    return `${studentNumber.substring(0, 4)}****`;
  }
  return studentNumber;
};

/**
 * 학번에서 입학년도를 추출합니다.
 */
export const extractAdmissionYear = (studentNumber: string): number => {
  return parseInt(studentNumber.substring(0, 4));
};

/**
 * 학번에서 학년을 계산합니다.
 */
export const calculateGrade = (studentNumber: string): number => {
  const admissionYear = extractAdmissionYear(studentNumber);
  const currentYear = new Date().getFullYear();
  const grade = currentYear - admissionYear + 1;
  
  // 학년 범위 제한 (1~6학년)
  return Math.max(1, Math.min(6, grade));
};
