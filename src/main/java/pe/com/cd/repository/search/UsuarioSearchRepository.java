package pe.com.cd.repository.search;

import pe.com.cd.domain.Usuario;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Usuario entity.
 */
public interface UsuarioSearchRepository extends ElasticsearchRepository<Usuario, Long> {
}
