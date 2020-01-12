package com.ls.myschool.dao.common;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Repository
public class CommonDaoImpl implements CommonDao {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Object findById(Long id, Class<?> clazz) {
		Object object = em.find(clazz, id);
		return object;
	}

	@Override
	@Transactional
	public Object save(Object entity) {
		return em.merge(entity);
	}

	@Override
	@Transactional
	public void delete(Object entity) {
		em.remove(entity);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Object findOne(List<Filter> filters, Class<?> clazz) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<?> cqry = cb.createQuery(clazz);
		Root<?> root = cqry.from(clazz);

		if (filters == null || filters.isEmpty()) {
			Query qry = em.createQuery(cqry);
			Object results = qry.getResultList();
			return results;
		}

		List<Predicate> predicates = processFilters(filters, root, cb);

		Predicate predicate = null;
		if (predicates.size() > 1)
			predicate = cb.and((Predicate[]) predicates.toArray());
		else
			predicate = predicates.get(0);

		cqry.where(predicate);

		Query qry = em.createQuery(cqry);
		List<Object> results = qry.getResultList();

		if (results == null || results.isEmpty())
			return null;
		else
			return results.get(0);

	}

	@Override
	public Object findAll(Class<?> clazz) {
		Object results = em.createQuery("select entity from " + clazz.getName() + " entity", clazz).getResultList();
		return results;
	}

	@Override
	public Object find(List<Filter> filters, Class<?> clazz) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<?> cqry = cb.createQuery(clazz);
		Root<?> root = cqry.from(clazz);

		if (filters == null || filters.isEmpty()) {
			Query qry = em.createQuery(cqry);
			Object results = qry.getResultList();
			return results;
		}

		List<Predicate> predicates = processFilters(filters, root, cb);

		Predicate predicate = null;
		if (predicates.size() > 1)
			predicate = cb.and((Predicate[]) predicates.toArray());
		else
			predicate = predicates.get(0);

		cqry.where(predicate);

		Query qry = em.createQuery(cqry);
		Object results = qry.getResultList();

		return results;
	}

	private List<Predicate> processFilters(List<Filter> filters, Root<?> root, CriteriaBuilder cb) {

		List<Predicate> predicates = new ArrayList<>();

		filters.forEach(filter -> {

			String fieldPath = filter.getFieldPath();
			// FieldType fieldType = filter.getFieldType();
			Operator operator = filter.getOperator();
			Object value = filter.getValue();
			Predicate predicate = null;

			if (operator.equals(Operator.EQUAL)) {
				predicate = cb.equal(root.get(fieldPath), value);
			}

			else if (operator.equals(Operator.NOT_EQUAL)) {
				predicate = cb.notEqual(root.get(fieldPath), value);
			}

			predicates.add(predicate);
		});

		return predicates;
	}

}
