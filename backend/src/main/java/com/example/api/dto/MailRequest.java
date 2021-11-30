package com.example.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@ToString
public class MailRequest {
    private String companyName;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String title;
    private String context;
    private MultipartFile selectedFile;
    private String type;
}
