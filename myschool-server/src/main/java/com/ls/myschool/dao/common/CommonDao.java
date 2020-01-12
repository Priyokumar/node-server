package com.ls.myschool.dao.common;

import java.util.List;

import com.ls.myschool.vo.Filter;

public interface CommonDao {

	public Object findById(Long id, Class<?> clazz);

	public Object findOne(List<Filter> filters, Class<?> clazz);

	public Object findAll(Class<?> clazz);

	public Object find(List<Filter> filters, Class<?> clazz);

	public Object save(Object entity);

	public void delete(Object entity);

}
