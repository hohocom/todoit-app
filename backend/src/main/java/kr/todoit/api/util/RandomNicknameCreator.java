package kr.todoit.api.util;

public class RandomNicknameCreator {
    public static String getRandomNickname(){
        String[] modifierList = {
                "변덕스러운","외로운",
                "고집스러운","개구쟁이",
                "용감한", "대담한",
                "수줍은", "장난꾸러기",
                "촐랑촐랑한", "무사태평한",
                "조심스런", "의젓한",
                "노력파", "덜렁거리는",
                "냉정한", "차분한",
                "얌전한", "신중한",
                "온순한", "건방진",
                "겁쟁이", "성급한",
                "명랑한", "천진난만한",
                "성실한"};
        String modifier = modifierList[(int)(Math.random() * modifierList.length)+1];
        String randomNickname = modifier+" 투두";
//        System.out.println(randomNickname);
        return randomNickname;
    }
}