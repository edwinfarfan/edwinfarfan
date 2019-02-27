package pe.com.cd.repository;

import pe.com.cd.domain.TransaccionPersona;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransaccionPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransaccionPersonaRepository extends JpaRepository<TransaccionPersona, Long> {

}
