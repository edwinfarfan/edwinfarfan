package pe.com.cd.repository;

import pe.com.cd.domain.TransaccionCambista;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransaccionCambista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransaccionCambistaRepository extends JpaRepository<TransaccionCambista, Long> {

}
