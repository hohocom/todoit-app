package com.example.api.service;

import com.example.api.dto.MailRequest;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;


@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender javaMailSender;
    private SpringTemplateEngine springTemplateEngine;
    private ImageService imageService;

    public void send(MailRequest mailRequest) throws MessagingException, IOException {
        String sendTo = "hohoco0701@gmail.com";
        String mailTitle = mailRequest.getType().equals("recruitment") ?"호호컴퍼니 지원서": "문의사항";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setSubject(mailTitle);
        messageHelper.setFrom(sendTo);
        messageHelper.setTo(sendTo);

        String companyName =  mailRequest.getCompanyName()!= null ?"<p>회사명 : "+ mailRequest.getCompanyName() +"</p>\n":"";
        String html =
            "    <h2>담당자 정보</h2>\n" + companyName +
            "    <p>성함/직책 :"+mailRequest.getUserName()+"</p>\n" +
            "    <p>휴대전화 : "+mailRequest.getUserPhone()+"</p>\n" +
            "    <p>이메일주소 :"+mailRequest.getUserEmail()+"</p>\n" +
            "    <br/>\n" +
            "    <h2>제안내용</h2>\n" +
            "    <p>제목 :"+mailRequest.getTitle()+"</p>\n" +
            "    <p>내용: "+mailRequest.getContext()+"</p>\n";
        messageHelper.setText(html, true);

        HashMap<String, String> images = imageService.upload(mailRequest.getSelectedFile());
        String imagePath = images.get("path").concat(images.get("origin"));
        System.out.println(imagePath);
        FileSystemResource fsr = new FileSystemResource(imagePath);

        String[] imagePathArray = imagePath.split("/");
        String imageName = imagePathArray[imagePathArray.length-1];
        messageHelper.addAttachment(imageName, fsr);
        javaMailSender.send(message);
    }
}
