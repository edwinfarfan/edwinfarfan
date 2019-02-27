package pe.com.cd.repository;

import pe.com.cd.domain.Rol;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Rol entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

}
