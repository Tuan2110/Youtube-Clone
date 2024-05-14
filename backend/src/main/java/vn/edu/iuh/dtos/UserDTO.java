package vn.edu.iuh.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String sub;
    private String picture;
}
