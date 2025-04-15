package com.skillbridge.skillbridge.jwt;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Component
public class JwtWebSocketInterceptor implements HandshakeInterceptor {

    private final JwtHelper jwtHelper;

    public JwtWebSocketInterceptor(JwtHelper jwtHelper) {
        this.jwtHelper = jwtHelper;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        List<String> authHeaders = request.getHeaders().get("Authorization");
        String token = (authHeaders != null && !authHeaders.isEmpty()) ? authHeaders.get(0) : null;

        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7); 
            if (jwtHelper.validateToken(jwtToken, jwtHelper.getUsernameFromToken(jwtToken))) {
                return true; 
            } else {
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return false;  
            }
        }

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return false;  
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // Optional: Additional actions after handshake
    }
}
