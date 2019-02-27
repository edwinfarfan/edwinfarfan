package pe.com.cd.repository;

import pe.com.cd.domain.TelefonoPersona;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TelefonoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TelefonoPersonaRepository extends JpaRepository<TelefonoPersona, Long> {

}
