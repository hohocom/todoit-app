package kr.todoit.api.controller;

import kr.todoit.api.dto.TestRequest;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class SocketTestController {

    @MessageMapping("/sendTo")
    @SendTo("/topics/sendTo")
    public TestRequest SendToMessage(@RequestBody TestRequest testRequest) {
        System.out.println(testRequest.getText());
        return testRequest;
    }
}
