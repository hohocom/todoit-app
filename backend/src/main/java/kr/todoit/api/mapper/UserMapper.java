package kr.todoit.api.mapper;

import kr.todoit.api.dto.UserFindRequest;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {
    List<HashMap<String, Object>> findUserByOptions(UserFindRequest userFindRequest);
}
