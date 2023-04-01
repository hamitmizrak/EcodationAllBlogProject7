package com.hamitmizrak.error;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.sql.Date;

@Data
@AllArgsConstructor
@Builder
public class ApiResult {
    private int status;
    private String path;
    private String message;
    private Date createdDate=new Date(System.currentTimeMillis());

    public ApiResult(int status, String path, String message) {
        this.status = status;
        this.path = path;
        this.message = message;
    }
}
