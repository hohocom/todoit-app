package kr.todoit.api.mapper;

import kr.todoit.api.dto.WorkFindRequest;
import kr.todoit.api.dto.WorkFindResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface WorkMapper {
    List<WorkFindResponse> findWorksByOptions(WorkFindRequest workFindRequest);
}
