package pe.com.cd.repository;

import pe.com.cd.domain.DireccionPersona;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DireccionPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DireccionPersonaRepository extends JpaRepository<DireccionPersona, Long> {

}
