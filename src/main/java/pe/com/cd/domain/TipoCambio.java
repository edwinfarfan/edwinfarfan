package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import pe.com.cd.domain.enumeration.TipoOperacion;

/**
 * A TipoCambio.
 */
@Entity
@Table(name = "tipo_cambio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tipocambio")
public class TipoCambio implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_operacion")
    private TipoOperacion tipoOperacion;

    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private Moneda moneda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public TipoCambio fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public TipoOperacion getTipoOperacion() {
        return tipoOperacion;
    }

    public TipoCambio tipoOperacion(TipoOperacion tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
        return this;
    }

    public void setTipoOperacion(TipoOperacion tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public TipoCambio valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getEstado() {
        return estado;
    }

    public TipoCambio estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public TipoCambio moneda(Moneda moneda) {
        this.moneda = moneda;
        return this;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoCambio tipoCambio = (TipoCambio) o;
        if (tipoCambio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoCambio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoCambio{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", tipoOperacion='" + getTipoOperacion() + "'" +
            ", valor=" + getValor() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
