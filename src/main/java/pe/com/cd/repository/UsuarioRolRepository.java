package pe.com.cd.repository;

import pe.com.cd.domain.UsuarioRol;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UsuarioRol entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, Long> {

}
