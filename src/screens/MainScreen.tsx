import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

interface MainScreenProps {
  userProfile: any;
  onLogout: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  userProfile,
  onLogout,
}) => {
  const [currentTab, setCurrentTab] = useState<
    "matching" | "chats" | "profile"
  >("matching");

  // 임시 매칭 데이터
  const mockMatches = [
    {
      id: "1",
      name: "김영희",
      major: "경영학과",
      grade: 3,
      bio: "영화 보는 것을 좋아해요!",
      interests: ["영화", "음악", "여행"],
      distance: "0.5km",
    },
    {
      id: "2",
      name: "박철수",
      major: "컴퓨터공학과",
      grade: 2,
      bio: "게임 개발에 관심이 많아요",
      interests: ["게임", "프로그래밍", "음악"],
      distance: "1.2km",
    },
    {
      id: "3",
      name: "이미영",
      major: "심리학과",
      grade: 4,
      bio: "책 읽기와 커피를 좋아해요",
      interests: ["독서", "커피", "산책"],
      distance: "0.8km",
    },
  ];

  const renderMatchingTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>추천 매칭</Text>
      <Text style={styles.sectionSubtitle}>
        관심사가 비슷한 학생들을 추천해드려요!
      </Text>

      {mockMatches.map((match) => (
        <View key={match.id} style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{match.name.charAt(0)}</Text>
            </View>
            <View style={styles.matchInfo}>
              <Text style={styles.matchName}>{match.name}</Text>
              <Text style={styles.matchDetails}>
                {match.major} • {match.grade}학년 • {match.distance}
              </Text>
            </View>
          </View>

          <Text style={styles.matchBio}>{match.bio}</Text>

          <View style={styles.interestsContainer}>
            {match.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>

          <View style={styles.matchActions}>
            <TouchableOpacity style={styles.passButton}>
              <Text style={styles.passButtonText}>패스</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton}>
              <Text style={styles.likeButtonText}>좋아요</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderChatsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>채팅</Text>
      <Text style={styles.sectionSubtitle}>
        매칭된 사용자와 대화를 나누세요!
      </Text>

      <View style={styles.emptyChats}>
        <Text style={styles.emptyChatsIcon}>💬</Text>
        <Text style={styles.emptyChatsTitle}>아직 채팅이 없어요</Text>
        <Text style={styles.emptyChatsText}>
          좋아요를 눌러서 매칭을 시작해보세요!
        </Text>
      </View>
    </View>
  );

  const renderProfileTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>내 프로필</Text>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {userProfile?.name?.charAt(0) || "?"}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {userProfile?.name || "이름"}
            </Text>
            <Text style={styles.profileDetails}>
              {userProfile?.major || "학과"} • {userProfile?.grade || "학년"}
              학년
            </Text>
          </View>
        </View>

        {userProfile?.bio && (
          <Text style={styles.profileBio}>{userProfile.bio}</Text>
        )}

        {userProfile?.interests && userProfile.interests.length > 0 && (
          <View style={styles.profileInterests}>
            <Text style={styles.interestsLabel}>관심사:</Text>
            <View style={styles.interestsTags}>
              {userProfile.interests.map((interest: string, index: number) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>인하대학교 소개팅</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* 탭 네비게이션 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, currentTab === "matching" && styles.activeTab]}
          onPress={() => setCurrentTab("matching")}
        >
          <Text
            style={[
              styles.tabText,
              currentTab === "matching" && styles.activeTabText,
            ]}
          >
            매칭
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentTab === "chats" && styles.activeTab]}
          onPress={() => setCurrentTab("chats")}
        >
          <Text
            style={[
              styles.tabText,
              currentTab === "chats" && styles.activeTabText,
            ]}
          >
            채팅
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentTab === "profile" && styles.activeTab]}
          onPress={() => setCurrentTab("profile")}
        >
          <Text
            style={[
              styles.tabText,
              currentTab === "profile" && styles.activeTabText,
            ]}
          >
            프로필
          </Text>
        </TouchableOpacity>
      </View>

      {/* 탭 콘텐츠 */}
      <ScrollView style={styles.content}>
        {currentTab === "matching" && renderMatchingTab()}
        {currentTab === "chats" && renderChatsTab()}
        {currentTab === "profile" && renderProfileTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButtonText: {
    fontSize: 20,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#6c757d",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 25,
  },
  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 14,
    color: "#6c757d",
  },
  matchBio: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  interestTag: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: "#495057",
  },
  matchActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passButton: {
    flex: 1,
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },
  passButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  likeButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
  },
  likeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyChats: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyChatsIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyChatsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
  },
  emptyChatsText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  profileAvatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  profileDetails: {
    fontSize: 16,
    color: "#6c757d",
  },
  profileBio: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 20,
  },
  profileInterests: {
    marginBottom: 20,
  },
  interestsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
  },
  interestsTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
