package pe.com.cd.service;

import pe.com.cd.domain.User;
import pe.com.cd.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pe.com.cd.web.rest.vm.ManagedUserVM;


import java.util.List;
import java.util.Optional;

/**
 * Service class for managing users.
 */

public interface UserService {

    Page<UserDTO> getAllManagedUsers(Pageable pageable);

    List<String> getAuthorities();

    void deleteUser(String login);

    Optional<User> getUserWithAuthoritiesByLogin(String login);

    Optional<UserDTO> updateUser(UserDTO userDTO);

    User createUser(UserDTO userDTO);

    User registerUser(UserDTO managedUserVM, String password);

    Optional<User> activateRegistration(String key);

    Optional<User> getUserWithAuthorities();

    void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl);

    void changePassword(String currentPassword, String newPassword);

    Optional<User> requestPasswordReset(String mail);

    Optional<User> completePasswordReset(String newPassword, String key);

    void removeNotActivatedUsers();
}
