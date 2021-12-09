package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class WorkFindResponse {
    private List<HashMap<String, Object>> works;
}
