// 사용자 정보 타입
export interface User {
  id: string;
  studentNumber: string; // 학번
  name: string;
  major: string; // 학과
  grade: number; // 학년
  email: string; // @inha.ac.kr
  phoneNumber: string;
  profileImage?: string;
  bio?: string; // 자기소개
  interests: string[]; // 관심사
  isVerified: boolean; // 인증 완료 여부
  createdAt: Date;
  updatedAt: Date;
}

// 바코드 스캔 결과 타입
export interface BarcodeScanResult {
  data: string;
  type: string;
  studentNumber?: string; // 추출된 학번
}

// 인증 상태 타입
export interface AuthenticationStatus {
  isAuthenticated: boolean;
  studentNumber?: string;
  verificationStep: 'none' | 'barcode' | 'email' | 'phone' | 'complete';
  errorMessage?: string;
}

// 매칭 정보 타입
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  matchedAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
  lastMessageAt?: Date;
}

// 채팅 메시지 타입
export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

// 네비게이션 타입
export type RootStackParamList = {
  Welcome: undefined;
  Authentication: undefined;
  ProfileSetup: { studentNumber: string };
  Main: undefined;
  Chat: { matchId: string };
  Settings: undefined;
};
