package kr.todoit.api.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface WorkMapper {
    List<HashMap<String, Object>> findWorkByWorkspaceIdAndGroupByWorkId(Long workspaceId);
}
