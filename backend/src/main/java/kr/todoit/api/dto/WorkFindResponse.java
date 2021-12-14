package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
public class WorkFindResponse {
    private Long id;
    private String title;
    private String content;
    private String start;
    private String end;
    private String color;
    private String isFinished;
    private List<HashMap<String, Object>> users;
}
