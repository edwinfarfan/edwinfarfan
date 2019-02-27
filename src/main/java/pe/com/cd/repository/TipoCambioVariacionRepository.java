package pe.com.cd.repository;

import pe.com.cd.domain.TipoCambioVariacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoCambioVariacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoCambioVariacionRepository extends JpaRepository<TipoCambioVariacion, Long> {

}
